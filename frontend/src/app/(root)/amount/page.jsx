

"use client";
import HeaderName from '@/components/HeaderName';
import React, { Suspense, useState } from 'react';
import AddAmountModel from '@/components/Amount/AddAmountModel';
import { useMainContext } from '@/context/MainContext';
import { FaEye, FaEyeSlash, FaHeadset, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import AddAccountModal from './+__(components)/AddAccountModal';
import CustomLoader from '@/components/reuseable/CustomLoader';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AmountPage = () => {
  const { user } = useMainContext();

  return (
    <>
      <div className="container py-10 px-3 min-h-screen flex flex-col justify-between">
        <div>
          <HeaderName />

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-6 mt-10">
            {user && user.account_no && user.account_no.length > 0 &&
              user.account_no.map((cur, i) => <Card key={i} cur={cur} />)}

            <Suspense fallback={<CustomLoader />}>
              <AddAccountModal />
            </Suspense>
          </div>
        </div>

        {/* ✅ Fixed Footer placed once per page */}
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
                className="object-contain mb-2"
              />
              <h3 className="text-lg font-semibold text-indigo-400">Orion Bank</h3>
              <p className="text-sm text-gray-300">© 2025 Orion Bank. All Rights Reserved.</p>
              <p className="text-xs text-gray-400 mt-1">
                Designed & Developed by <span className="font-semibold text-indigo-400">Aditya Kumar Dubey</span>
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
    </>
  );
};

export default AmountPage;

// -------------------------- CARD DESIGN --------------------------

const Card = ({ cur }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="relative group bg-gradient-to-br from-indigo-500/10 via-pink-400/10 to-purple-500/10
      backdrop-blur-xl border border-white/20 shadow-lg rounded-3xl p-6 
      flex items-center justify-between overflow-hidden transform-gpu
      hover:shadow-[0_25px_60px_rgba(0,0,0,0.4)] hover:-translate-y-2 
      transition-all duration-500 cursor-pointer"
    >
      {/* Subtle light reflection animation */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent 
        opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700"></div>

      {/* Moving light shimmer effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12"
      />

      {/* Card Content */}
      <div className="flex flex-col z-10">
        <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Add Amount
        </h1>
        <p className="text-sm text-violet-700 font-medium mt-1">{cur._id}</p>

        <div className="mt-4 text-2xl font-bold text-violet-900 dark:text-gray-100 flex items-center gap-x-3">
          <span>
            ₹ {isShow ? cur.amount : "".padStart(`${cur.amount}`.length, "x")}/-
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsShow(!isShow);
            }}
            type="button"
            className="outline-none text-violet-900 dark:text-gray-200 hover:scale-110 transition-transform"
          >
            {!isShow ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>

      <div className="z-10">
        <AddAmountModel id={cur._id} />
      </div>

      {/* Glowing border animation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-pink-400/60 animate-pulse"
      ></motion.div>
    </motion.div>
  );
};
