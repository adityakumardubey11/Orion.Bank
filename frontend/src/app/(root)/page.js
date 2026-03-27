"use client";
import { useState, useEffect } from "react";
import { BsCoin } from "react-icons/bs";
import { RiCoinsLine } from "react-icons/ri";
import { IoCardSharp } from "react-icons/io5";
import { FaMoneyCheckAlt, FaPlusCircle, FaRegCreditCard, FaHeadset, FaPhoneAlt, FaEye, FaEyeSlash, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import Particles from "react-tsparticles";
import Image from "next/image";

import DashboardCard from "@/components/DashboardCard";
import ActionButton from "@/components/ActionButton";
import HeaderName from "@/components/HeaderName";
import { useMainContext } from "@/context/MainContext";
import { axiosClient } from "@/utils/AxiosClient";
import moment from "moment";

const HomePage = () => {
  const { user } = useMainContext();
  const [activeTravel, setActiveTravel] = useState("Hotel Booking");
  const [showAmount, setShowAmount] = useState(true);
  const [showFd, setShowFd] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [transactionsError, setTransactionsError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosClient.get('/amount/transactions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const allData = res.data.map(t => ({
          id: t.id,
          desc: t.description,
          amount: t.amount,
          type: t.transaction_type,
          date: moment(t.created_at).format('DD MMM YYYY'),
          created_at: t.created_at
        }));
        const tableData = allData.slice(0, 4);
        setTransactions(tableData);

        // Process for bar chart
        const monthlyData = {};
        allData.forEach(t => {
          const month = moment(t.created_at).format('MMM');
          if (!monthlyData[month]) {
            monthlyData[month] = { credit: 0, debit: 0 };
          }
          if (t.type === 'credit') {
            monthlyData[month].credit += t.amount;
          } else {
            monthlyData[month].debit += t.amount;
          }
        });
        const barDataArray = Object.keys(monthlyData).map(month => ({
          month,
          credit: monthlyData[month].credit,
          debit: monthlyData[month].debit
        }));
        setBarData(barDataArray);

        setTransactionsError(null);
      } catch (e) {
        console.error(e);
        setTransactionsError('Failed to load transactions. Please try again later.');
      }
    };
    fetchTransactions();
  }, []);

  const { scrollY } = useViewportScroll();
  const yDashboard = useTransform(scrollY, [0, 500], [0, -50]);
  const yCharts = useTransform(scrollY, [0, 500], [0, -80]);

  const totalBalance = user?.account_no?.map(c => c.amount).reduce((p, c) => p + c, 0) ?? 0;

  const dashboard_data = [
    { 
      title: "Amount", 
      Icon: <BsCoin className="text-6xl text-orange-500" />, 
      value: showAmount ? `₹${totalBalance}` : "****", 
      toggleShow: () => setShowAmount(!showAmount), 
      link: "/amount" 
    },
    { 
      title: "FD Amount", 
      Icon: <RiCoinsLine className="text-6xl text-shadow-white" />, 
      value: showFd ? `₹${user?.fd_amount ?? 0}` : "****", 
      toggleShow: () => setShowFd(!showFd), 
      link: "/fd-amount" 
    },
    { 
      title: "ATM Cards", 
      Icon: <IoCardSharp className="text-6xl text-green-800" />, 
      value: `${user?.atms?.length ?? 0}`, 
      link: "/atm-cards" 
    },
  ];



  const pieData = [
    { name: "Savings", value: user?.fd_amount ?? 0 },
    { name: "Available Balance", value: totalBalance },
  ];
  const COLORS = ["#4F46E5", "#22C55E"];

  const [barData, setBarData] = useState([]);

  const partners = ["Flipkart","AMEX","ITC","Accor Hotels","Amazon","UBER","Singapore Airlines","Burger King","Swiggy","Zepto","JBL","Bose","HSBC","BookMyShow","Paytm"];

  const travelCategories = [
    { name: "Hotel Booking", img: "./hotels.png" },
    { name: "Flight Booking", img: "./Air.jpg" },
    { name: "Railway Tickets", img: "./train.png" },
    { name: "Bus Booking", img: "./bus.webp" },
    { name: "Homestays", img: "./homestays.png" },
    { name: "Cab Booking", img: "./cab.webp" },
    { name: "Cruise Booking", img: "./ship.jpg" },
    { name: "Travel Insurance", img: "./insurance.jpg" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gray-900">
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        options={{
          fpsLimit: 60,
          interactivity: { events: { onHover: { enable: true, mode: "repulse" } }, modes: { repulse: { distance: 120 } } },
          particles: {
            number: { value: 80 },
            color: { value: ["#4F46E5","#22C55E","#F59E0B","#EC4899"] },
            shape: { type: "circle" },
            opacity: { value: 0.3 },
            size: { value: { min: 2, max: 6 } },
            move: { enable: true, speed: 1.5, direction: "none", outModes: "out" },
          },
          detectRetina: true,
        }}
      />

      <div className="px-4 py-10 flex flex-col gap-12 relative z-10 max-w-[1600px] mx-auto">
        <HeaderName />

        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-500 to-yellow-400 animate-gradient-text">
            Welcome, {user?.name ?? "User"} 👋
          </h1>
          <p className="text-gray-300 text-lg">Your financial universe at a glance 🌌</p>
        </motion.div>

        {/* Dashboard Cards */}
        <motion.div style={{ y: yDashboard }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboard_data.map((d, i) => (
            <DashboardCard key={i} data={d} />
          ))}
        </motion.div>

        {/* Account Summary */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="bg-gradient-to-r from-indigo-100 via-indigo-50 to-indigo-200 p-6 rounded-3xl shadow-2xl border border-indigo-200">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Account Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-800">
            <p><b>Account Holder Name:</b> {user?.name ?? "User"}</p>
            <p><b>IFSC:</b> OB0001234</p>
            <p><b>Bank Name:</b> Orion Bank</p>
             <p><b>Account Status:</b> Active</p>
          </div>
        </motion.div>

       <div className="space-y-12"> 
  {/* Transactions Section */}
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
  >
    <h2 className="text-3xl font-bold mb-4 text-orange-500">Recent Transactions</h2>
    {transactionsError ? (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-3xl">
        {transactionsError}
      </div>
    ) : (
      <div className="bg-white shadow-xl rounded-3xl overflow-x-auto border border-indigo-100">
        <table className="w-full text-left">
          <thead className="bg-indigo-50">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Description</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">No transactions found.</td>
              </tr>
            ) : (
              transactions.map((tx, index) => (
                <motion.tr
                  key={`${tx.id}-${index}`}
                  whileHover={{ scale: 1.02, backgroundColor: "#f0f0ff" }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="border-b"
                >
                  <td className="p-3">{tx.date}</td>
                  <td className="p-3">{tx.desc}</td>
                  <td className={`p-3 font-bold ${tx.type==="credit"?"text-green-600":"text-red-500"}`}>
                    {tx.type==="credit"?`+₹${tx.amount}`:`-₹${tx.amount}`}
                  </td>
                  <td className="p-3 capitalize">{tx.type}</td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    )}
  </motion.div>

  {/* Charts Section */}
  <motion.div 
    style={{ y: yCharts }}
    className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-30 relative z-10"
  >
    {/* Savings vs Balance */}
    <motion.div 
      initial={{ scale:0.95, opacity:0 }} 
      animate={{ scale:1, opacity:1 }} 
      transition={{ duration:1.2 }} 
      className="bg-white shadow-2xl p-6 rounded-3xl"
    >
      <h2 className="text-2xl font-semibold mb-4 text-orange-500">Savings vs Balance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={pieData} dataKey="value" outerRadius={100} label>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>

    {/* Bar Chart */}
    <motion.div 
      initial={{ scale:0.95, opacity:0 }} 
      animate={{ scale:1, opacity:1 }} 
      transition={{ duration:1.2 }} 
      className="bg-white shadow-2xl p-6 rounded-3xl"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={barData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="credit" fill="#22C55E" radius={[8,8,0,0]} />
          <Bar dataKey="debit" fill="#EF4444" radius={[8,8,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  </motion.div>
</div>

 {/* ---------------- UPI Payments ---------------- */}

        <motion.div 
  initial={{ opacity: 0, y: 50 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true }} 
  transition={{ duration: 1.2 }} 
  className="mt-12"
>
  <h2 className="text-3xl font-bold mb-4 -mt-40 text-orange-500">UPI Payments</h2>
  
  {/* Use Grid for proper alignment */}
  <div className="grid grid-cols-4 gap-8 py-4">
    <ActionButton title="Send Money" Icon={FaMoneyCheckAlt} color="bg-green-500" />
    <ActionButton title="Scan QR" Icon={FaRegCreditCard} color="bg-blue-500" />
    <ActionButton title="Request Money" Icon={FaPlusCircle} color="bg-orange-500" />
    <ActionButton title="Pay Bills" Icon={FaMoneyCheckAlt} color="bg-purple-500" />
  </div>
</motion.div>

         {/* ---------------- Bill Payments & Recharges ---------------- */}
         <motion.div initial={{ opacity:0, y:50 }} 
         whileInView={{ opacity:1, y:0 }} 
         viewport={{ once:true }} 
         transition={{ duration:1.2 }} 
         className="mt-12">
           <h2 className="text-3xl font-bold mb-4 -mt-20 text-orange-500">Bill Payments & Recharges</h2>
           <div className="grid grid-cols-4 gap-8 py-4">
             <ActionButton title="Mobile Recharge" Icon={FaRegCreditCard} color="bg-purple-600" img="./mobile.webp"/>
             <ActionButton title="Electricity Bill" Icon={FaMoneyCheckAlt} color="bg-yellow-600" img="./electric.png"/>
             <ActionButton title="Gas Bill" Icon={FaMoneyCheckAlt} color="bg-red-600" img="./gas.png"/>
             <ActionButton title="Metro Ticket" Icon={FaRegCreditCard} color="bg-cyan-600" img="./metro.jpg"/>
           </div>
         </motion.div>

         {/* ---------------- Investments & Wealth ---------------- */}
         <motion.div initial={{ opacity:0, y:50 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:1.2 }} className="mt-12">
           <h2 className="text-3xl font-bold mb-4 -mt-20 text-orange-500">Investments & Wealth</h2>
           <div className="grid grid-cols-4 gap-8 py-4">            
            <ActionButton title="Recurring Deposits" Icon={RiCoinsLine} color="bg-indigo-500" img="./rd.png"/>
           <ActionButton title="Mutual Funds" Icon={RiCoinsLine} color="bg-green-700" img="./mutual.jpg"/>
             <ActionButton title="Digital Gold" Icon={BsCoin} color="bg-yellow-700" img="./dgold.jpg"/>
             <ActionButton title="Insurance" Icon={FaRegCreditCard} color="bg-pink-600" img="./lic.jpg"/>
          </div>
         </motion.div>

       {/* ---------------- Rewards & Partner Offers ---------------- */}
<motion.div 
  initial={{ opacity:0, y:50 }} 
  whileInView={{ opacity:1, y:0 }} 
  viewport={{ once:true }} 
  transition={{ duration:1.2 }} 
  className="mt-12"
>
  <h2 className="text-3xl font-bold mb-4 -mt-20 text-orange-500">Rewards & Partner Offers</h2>
  <div className="flex flex-wrap gap-8 py-4 overflow-x-hidden w-full">
    {partners.map((p, idx) => (
      <motion.div 
        key={idx} 
        whileHover={{ scale:1.1, rotate:5 }} 
        transition={{ type:'spring', stiffness:150 }} 
        className="flex flex-col items-center gap-2 p-4 bg-gradient-to-tr from-red-300 via-pink-500 to-pink-200 rounded-2xl shadow-2xl cursor-pointer min-w-[150px] max-w-[200px]"
      >
        <img src={`${p.toLowerCase()}.png`} alt={p} className="w-12 h-12 rounded-full shadow-md"/>
        <p className="text-white font-semibold text-center text-sm">{p}</p>
      </motion.div>
    ))}
  </div>
</motion.div>

{/* ---------------- Travel & Lifestyle ---------------- */}
<motion.div 
  initial={{ opacity:0, y:50 }} 
  whileInView={{ opacity:1, y:0 }} 
  viewport={{ once:true }} 
  transition={{ duration:1.2 }} 
  className="mt-12"
>
  <h2 className="text-3xl font-bold mb-4 -mt-20 text-orange-500">Travel & Lifestyle</h2>
  <div className="flex flex-wrap gap-6 overflow-x-hidden w-full">
    {travelCategories.map((t, i) => (
      <motion.a 
        key={i} 
        href="https://www.makemytrip.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        whileHover={{ scale:1.05, y:-5, boxShadow:"0px 10px 20px rgba(0,0,0,0.3)" }} 
        transition={{ type:'spring', stiffness:150 }}
        className="flex flex-col items-center gap-2 p-4 bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-2xl shadow-2xl min-w-[180px] max-w-[220px]"
      >
        <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full shadow-md"/>
        <p className="text-white font-semibold text-center">{t.name}</p>
      </motion.a>
    ))}
  </div>
</motion.div>

{/* ---------------- News & Bank Updates ---------------- */}
<motion.div 
  initial={{ opacity:0, y:50 }} 
  whileInView={{ opacity:1, y:0 }} 
  viewport={{ once:true }} 
  transition={{ duration:1.2 }} 
  className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6"
>
  <motion.a 
    href="https://www.thehindu.com/" 
    target="_blank" 
    rel="noopener noreferrer" 
    whileHover={{ scale:1.02 }} 
    transition={{ duration:0.5 }} 
    className="bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-2xl rounded-3xl p-6 text-white"
  >
    <h3 className="text-xl font-bold mb-2">Latest News</h3>
    <p>Powered by The Hindu →</p>
  </motion.a>
  <motion.a 
    href="https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12572&Mode=0" 
    target="_blank" 
    rel="noopener noreferrer" 
    whileHover={{ scale:1.02 }} 
    transition={{ duration:0.5 }} 
    className="bg-gradient-to-tr from-pink-500 to-pink-300 shadow-2xl rounded-3xl p-6 text-white"
  >
    <h3 className="text-xl font-bold mb-2">RBI Notifications</h3>
    <p>Click to check latest updates →</p>
  </motion.a>
</motion.div>

{/* ---------------- Support Section ---------------- */}
<motion.div 
  initial={{ opacity: 0, y: 50 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  viewport={{ once: true }} 
  transition={{ duration: 1.2 }} 
  className="mt-12 bg-gradient-to-r from-blue-700 to-indigo-900 p-6 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-4 shadow-2xl"
>
  <h3 className="text-white text-lg font-semibold">
    Need Help? Our support is available 24x7
  </h3>
  <div className="flex gap-4 overflow-x-hidden w-full">
    <motion.button 
      whileHover={{ scale: 1.05, rotate: -2, boxShadow: "0px 8px 20px rgba(0,0,0,0.4)" }} 
      transition={{ type: 'spring', stiffness: 150 }}
      className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-2xl shadow-lg"
    >
      <FaHeadset /> Chat Now
    </motion.button>
    <motion.button 
      whileHover={{ scale: 1.05, rotate: 2, boxShadow: "0px 8px 20px rgba(0,0,0,0.4)" }} 
      transition={{ type: 'spring', stiffness: 150 }}
      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-2xl shadow-lg"
    >
      <FaPhoneAlt /> Call Support
    </motion.button>
  </div>
</motion.div>

{/* ---------------- Footer ---------------- */}
<motion.footer 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true }} 
      transition={{ duration: 1.5 }} 
      className="mt-16 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-white p-8 rounded-t-3xl"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">

        {/* Left Section - Logo & Info */}
        <div className="flex flex-col sm:items-start text-center sm:text-left">
          <Image 
            src="/logo1.png" 
            alt="Orion Bank Logo" 
            width={150} 
            height={150} 
            className="object-contain mb-2 items-center"
          />
          <h3 className="text-lg font-semibold text-indigo-400">Orion Bank</h3>
          <p className="text-sm text-gray-300">© 2025 Orion Bank. All Rights Reserved.</p>
          <p className="text-xs text-gray-400 mt-1">
            Design & Developed By <span className="font-semibold text-indigo-400">Aditya Kumar Dubey</span>
          </p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a href="#about" className="hover:text-blue-400 transition">About Us</a>
          <a href="#services" className="hover:text-blue-400 transition">Services</a>
          <a href="#careers" className="hover:text-blue-400 transition">Careers</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </div>

        {/* Right Section - Social + Support */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex gap-3 text-lg">
            <a href="#" className="hover:text-blue-400"><FaLinkedin /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-400"><FaInstagram /></a>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.4)" }} 
            transition={{ type: 'spring', stiffness: 150 }}
            className="flex items-center gap-2 bg-blue-600 px-3 py-2 rounded-2xl shadow-lg text-sm"
          >
            <FaHeadset /> 24/7 Chat Support
          </motion.button>
        </div>
      </div>
    </motion.footer>

      </div>
    </div>
  );
}

export default HomePage;
