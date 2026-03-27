"use client";
import { motion } from "framer-motion";

const ActionButton = ({ title, Icon, color, img }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className={`relative ${color} text-white p-4 rounded-2xl flex flex-col items-center justify-center shadow-lg cursor-pointer min-w-[150px]`}
    >
      {img ? (
        <img src={img} alt={title} className="h-12 w-12 mb-2" />
      ) : (
        <Icon className="text-3xl mb-2" />
      )}
      <p className="font-semibold text-center">{title}</p>
      <motion.div
        className="absolute top-0 left-0 w-full h-full rounded-2xl bg-white opacity-10"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default ActionButton;

