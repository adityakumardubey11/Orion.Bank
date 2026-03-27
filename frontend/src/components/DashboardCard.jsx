"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const DashboardCard = ({ data }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <motion.div 
      whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(0,0,0,0.3)" }} 
      transition={{ type: "spring", stiffness: 150 }} 
      className="flex items-center justify-between bg-gradient-to-r from-red-200 via-pink-500 to-indigo-400 text-white rounded-3xl p-6 cursor-pointer relative overflow-hidden"
    >
      <div className="text-6xl">{data.Icon}</div>
      <div className="flex flex-col gap-y-2 justify-end text-right">
        <p className="text-2xl font-semibold">{data.title}</p>
        <div className="flex items-center justify-end gap-x-2">
          <h3 className="text-3xl font-bold">
            {isShow ? data.value : `${"x".repeat(`${data.value}`.length)}`}
          </h3>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsShow(!isShow); }} className="text-xl">
            {isShow ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Shimmer animation */}
      <motion.div 
        initial={{ x: "-100%" }} 
        animate={{ x: "100%" }} 
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }} 
        className="absolute top-0 left-0 w-2 h-full bg-white opacity-20"
      />
    </motion.div>
  );
};

export default DashboardCard;


