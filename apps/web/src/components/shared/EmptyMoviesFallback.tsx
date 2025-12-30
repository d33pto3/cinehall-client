import React from 'react';
import { motion } from 'framer-motion';
import { IconMovieOff, IconTicket } from '@tabler/icons-react';
import Link from 'next/link';

interface EmptyMoviesFallbackProps {
  title: string;
  description?: string;
  className?: string;
}

export const EmptyMoviesFallback = ({ 
  title, 
  description = "The cinematic curtain is currently closed for this section. Check back soon for more movie magic!",
  className 
}: EmptyMoviesFallbackProps) => {
  return (
    <div className={`w-full py-20 px-6 flex flex-col items-center justify-center text-center bg-[#322F2F40] backdrop-blur-md rounded-[40px] border border-white/5 mx-auto max-w-7xl my-12 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
        className="w-24 h-24 bg-[#FAAA47]/10 rounded-full flex items-center justify-center mb-6 border border-[#FAAA47]/20 relative"
      >
        <div className="absolute inset-0 bg-[#FAAA47] opacity-5 blur-xl rounded-full"></div>
        <IconMovieOff size={48} className="text-[#FAAA47] relative z-10" />
      </motion.div>
      
      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-white mb-3 tracking-tight"
      >
        No {title} Found
      </motion.h3>
      
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-[#CAC1C1] text-lg max-w-md mb-10 leading-relaxed"
      >
        {description}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link href="/movies">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#fba333" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FAAA47] text-black font-black uppercase tracking-widest text-sm px-10 py-4 rounded-2xl flex items-center gap-3 group transition-all shadow-[0_20px_40px_rgba(250,170,71,0.15)]"
          >
            <IconTicket size={22} className="group-hover:rotate-12 transition-transform" />
            Explore Library
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};
