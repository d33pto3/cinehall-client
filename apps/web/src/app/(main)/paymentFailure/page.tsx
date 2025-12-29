"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCcw, Home, XCircle } from "lucide-react";

const FailureContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const errorMsg = searchParams.get("error") || "Something went wrong with your transaction.";

    return (
        <div className="min-h-screen bg-[#1A0A0A] flex items-center justify-center p-6 text-white overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-500/5 blur-[120px] rounded-full" />
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
                    className="w-24 h-24 bg-red-500 rounded-full mx-auto flex items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.3)]"
                >
                    <XCircle size={48} className="text-white" />
                </motion.div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-black uppercase tracking-tight text-white">Payment Failed</h1>
                    <p className="text-neutral-400 font-medium">{errorMsg}</p>
                </div>

                <div className="bg-red-500/10 border border-red-500/10 rounded-2xl p-6 text-sm text-red-200/60 font-medium italic">
                    "Your money will be refunded if it was deducted from your account. Please try again."
                </div>

                <div className="flex flex-col gap-4">
                    <button 
                        onClick={() => router.back()}
                        className="w-full bg-white text-[#1A0A0A] py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#FAAA47] transition-all flex items-center justify-center gap-2 group"
                    >
                        Try Again
                        <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
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

const PaymentFailurePage = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#1A0A0A]" />}>
            <FailureContent />
        </Suspense>
    );
};

export default PaymentFailurePage;
