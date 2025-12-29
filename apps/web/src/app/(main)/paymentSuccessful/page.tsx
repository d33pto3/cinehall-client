"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Ticket, Home, ArrowRight } from "lucide-react";

const SuccessContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const bookingId = searchParams.get("bookingId");

    return (
        <div className="min-h-screen bg-[#1A0A0A] flex items-center justify-center p-6 text-white overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#FAAA47]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FAAA47]/5 blur-[120px] rounded-full" />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="max-w-md w-full bg-white/[0.03] border border-white/10 rounded-[3rem] p-10 md:p-14 backdrop-blur-xl relative z-10 text-center space-y-8"
            >
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                    className="w-24 h-24 bg-[#FAAA47] rounded-full mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(250,170,71,0.3)]"
                >
                    <CheckCircle2 size={48} className="text-[#1A0A0A]" />
                </motion.div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black uppercase tracking-tight text-white">Payment Success!</h1>
                    <p className="text-neutral-400 font-medium">Your movie tickets have been confirmed and sent to your email.</p>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-2">
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500">Booking Reference</p>
                    <p className="text-lg font-mono font-bold text-[#FAAA47]">#{bookingId?.slice(-8).toUpperCase()}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <button 
                        onClick={() => router.push(`/tickets/${bookingId}`)}
                        className="w-full bg-white text-[#1A0A0A] py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#FAAA47] transition-all flex items-center justify-center gap-2 group"
                    >
                        View My Tickets
                        <Ticket size={18} />
                    </button>
                    <button 
                        onClick={() => router.push("/")}
                        className="w-full bg-transparent text-neutral-400 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                        <Home size={16} />
                        Back to Home
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const PaymentSuccessfulPage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#1A0A0A]" />}>
            <SuccessContent />
        </Suspense>
    );
};

export default PaymentSuccessfulPage;
