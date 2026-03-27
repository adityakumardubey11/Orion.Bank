
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";
import ClaimFDModel from "./ClaimFDModel";

const FDCard = ({ data, isUpdate, setIsUpdate }) => {
  const [isShow, setIsShow] = useState(false);
  const amount = `${data.amount}`;

  return (
    <motion.div
      whileHover={{
        rotateX: 6,
        rotateY: -6,
        scale: 1.04,
        boxShadow: "0 25px 80px rgba(0,0,0,0.7)",
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      className="relative w-full h-60 rounded-3xl p-6 overflow-hidden 
      bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1c1c1c]
      border border-[#2a2a2a] shadow-[0_10px_40px_rgba(0,0,0,0.7)]
      flex flex-col justify-between"
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
    >
      {/* Animated glow reflection */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30 skew-x-[-20deg]"
      />

      {/* Corner gradient glows */}
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-tr from-amber-500/20 to-pink-500/10 blur-3xl rounded-full" />
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-purple-600/20 to-blue-600/10 blur-3xl rounded-full" />

      {/* Brand Logo */}
      <div className="flex justify-between items-start relative z-10">
        <Image
          src="/logo.png"
          alt="Orion Bank"
          width={70}
          height={70}
          className="opacity-90 drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)]"
        />
        <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          Fixed Deposit
        </div>
      </div>

      {/* FD Type */}
      <div className="relative z-10">
        <h2 className="text-3xl font-semibold text-white tracking-wide">
          {data?.apply_for}
        </h2>
        <p className="text-sm text-zinc-400 mt-1">Orion Secure Deposit</p>
      </div>

      {/* Amount + Button */}
      <div className="relative z-10 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200 drop-shadow-md">
            ₹ {isShow ? amount : "".padStart(amount.length, "x")}/-
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsShow(!isShow);
            }}
            type="button"
            className="text-zinc-400 hover:text-amber-400 transition"
          >
            {!isShow ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        <motion.div
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          <ClaimFDModel methods={{ isUpdate, setIsUpdate }} id={data?._id} />
        </motion.div>
      </div>

      {/* Border glow */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
    </motion.div>
  );
};

export default FDCard;
