"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
      <div className="relative w-20 h-20">
        <motion.div
          className="absolute inset-0 border-4 border-[#FAAA47] rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-2 border-4 border-[#FAAA47]/30 rounded-full border-t-[#FAAA47]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <p className="text-[#FAAA47] font-bold text-lg uppercase tracking-[0.3em] animate-pulse">
        CineHall Loading
      </p>
    </div>
  );
}
