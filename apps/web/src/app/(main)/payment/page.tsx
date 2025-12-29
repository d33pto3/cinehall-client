"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, ArrowLeft, Ticket, Calendar, Clock, MapPin, Receipt, ShieldCheck } from "lucide-react";
import { fetchShowById, fetchSeatsByShow, createBooking, initiatePayment } from "@/lib/booking-actions";
import { IShow, ISeat, SeatStatus } from "@/lib/booking-types";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import axios from "axios";

const PaymentContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user } = useAuth();
    
    const showId = searchParams.get("showId");
    const seatIdsString = searchParams.get("seatIds");
    const seatIds = seatIdsString ? seatIdsString.split(",") : [];
    const guestId = searchParams.get("guestId");
    
    const [show, setShow] = useState<IShow | null>(null);
    const [seats, setSeats] = useState<ISeat[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        if (!showId || !seatIds.length) {
            router.push("/");
            return;
        }

        const loadData = async () => {
            try {
                const [showData, seatsRes] = await Promise.all([
                    fetchShowById(showId),
                    fetchSeatsByShow(showId)
                ]);
                setShow(showData);
                const selectedSeats = seatsRes.data.seats.filter(s => seatIds.includes(s._id));
                setSeats(selectedSeats);
            } catch (err) {
                console.error("Failed to load payment data:", err);
                alert("Error loading booking details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [showId, seatIdsString, router]);

    const handleConfirmPayment = async () => {
        if (!show || seats.length === 0) return;

        // If user is not logged in, redirect to login with return URL
        if (!user) {
            const currentUrl = window.location.pathname + window.location.search;
            router.push(`/login?redirect=${encodeURIComponent(currentUrl)}`);
            return;
        }

        try {
            setProcessing(true);
            
            // 1. Create Booking
            const bookingRes = await createBooking({
                userId: user._id,
                guestId: guestId || undefined,
                showId: show._id,
                movieId: typeof show.movieId === 'string' ? show.movieId : show.movieId._id,
                screenId: typeof show.screenId === 'string' ? show.screenId : show.screenId._id,
                seats: seatIds
            });

            if (bookingRes.success) {
                // 2. Initiate Payment
                const paymentRes = await initiatePayment(bookingRes.data._id);
                if (paymentRes.success && paymentRes.url) {
                    // Redirect to SSLCommerz
                    window.location.href = paymentRes.url;
                }
            }
        } catch (err) {
            console.error("Booking/Payment failed:", err);
            if (axios.isAxiosError(err)) {
                alert(err.response?.data?.message || "Failed to process payment. Please try again.");
            } else {
                alert("An unexpected error occurred.");
            }
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1A0A0A] flex items-center justify-center">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-12 h-12 border-4 border-[#FAAA47] border-t-transparent rounded-full"
                />
            </div>
        );
    }

    if (!show || seats.length === 0) return null;

    const movie = typeof show.movieId === 'string' ? { title: "Movie", genre: "", imageUrl: "" } : show.movieId;
    const screen = typeof show.screenId === 'string' ? { name: "Screen" } : show.screenId;
    const date = new Date(show.startTime).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
    const time = new Date(show.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const totalAmount = seats.length * show.basePrice;

    return (
        <div className="min-h-screen bg-[#1A0A0A] text-white p-6 md:p-12 selection:bg-[#FAAA47] selection:text-[#1A0A0A]">
            <div className="max-w-5xl mx-auto">
                {/* Back Link */}
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-neutral-400 hover:text-[#FAAA47] transition-colors mb-12 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold uppercase tracking-widest text-sm">Back to Seat Selection</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Left Side: Summary */}
                    <div className="lg:col-span-3 space-y-8">
                        <section className="space-y-6">
                            <h1 className="text-4xl font-black uppercase tracking-tight text-[#FAAA47]">Review Your Order</h1>
                            <p className="text-neutral-500 font-medium">Please review your booking details before proceeding to payment.</p>
                        </section>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-sm"
                        >
                            <div className="p-8 space-y-8">
                                {/* Movie & Screen */}
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="relative w-full md:w-32 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-white/5">
                                        <Image 
                                            src={movie?.imageUrl || "/movie_banner_placeholder.jpg"} 
                                            alt="Movie Poster"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="space-y-4 flex-1">
                                        <div className="space-y-1">
                                            <h2 className="text-3xl font-black text-white">{movie.title}</h2>
                                            <p className="text-[#FAAA47] font-bold text-sm tracking-widest uppercase">{movie.genre}</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">Date</p>
                                                <div className="flex items-center gap-2 text-sm font-bold">
                                                    <Calendar size={14} className="text-[#FAAA47]" />
                                                    {date}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">Time</p>
                                                <div className="flex items-center gap-2 text-sm font-bold">
                                                    <Clock size={14} className="text-[#FAAA47]" />
                                                    {time}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">Theatre</p>
                                                <div className="flex items-center gap-2 text-sm font-bold">
                                                    <MapPin size={14} className="text-[#FAAA47]" />
                                                    {screen.name}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">Tickets</p>
                                                <div className="flex items-center gap-2 text-sm font-bold">
                                                    <Ticket size={14} className="text-[#FAAA47]" />
                                                    {seats.length} x {seats[0]?.row}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-white/5" />

                                {/* Selected Seats */}
                                <div className="space-y-4">
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">Selected Seats</p>
                                    <div className="flex flex-wrap gap-2">
                                        {seats.map(seat => (
                                            <span 
                                                key={seat._id}
                                                className="px-4 py-2 bg-[#FAAA47]/10 border border-[#FAAA47]/30 text-[#FAAA47] rounded-lg text-sm font-black"
                                            >
                                                {seat.row}{seat.column}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex items-center gap-4 p-6 bg-blue-500/10 border border-blue-500/20 rounded-3xl">
                            <ShieldCheck className="text-blue-400 shrink-0" size={24} />
                            <p className="text-sm text-blue-100/70">
                                Your payment is secured via SSLCommerz. We do not store your card details on our servers.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Price Summary */}
                    <div className="lg:col-span-2">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8 sticky top-12 backdrop-blur-md"
                        >
                            <div className="flex items-center gap-3 text-[#FAAA47]">
                                <Receipt size={24} />
                                <h2 className="text-xl font-black uppercase tracking-widest">Order Summary</h2>
                            </div>

                            <div className="space-y-4 font-bold">
                                <div className="flex justify-between items-center text-neutral-400">
                                    <span>Tickets x {seats.length}</span>
                                    <span className="text-white">BDT {totalAmount}</span>
                                </div>
                                <div className="flex justify-between items-center text-neutral-400">
                                    <span>Service Fee</span>
                                    <span className="text-white">BDT 0</span>
                                </div>
                                <div className="h-px bg-white/10 my-4" />
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Total Payable</p>
                                        <p className="text-4xl font-black text-[#FAAA47]">BDT {totalAmount}</p>
                                    </div>
                                </div>
                            </div>

                            <button 
                                onClick={handleConfirmPayment}
                                disabled={processing}
                                className="w-full group relative overflow-hidden bg-[#FAAA47] hover:bg-[#ffc163] text-[#1A0A0A] py-6 rounded-2xl font-black text-xl uppercase tracking-widest transition-all shadow-[0_20px_40px_rgba(250,170,71,0.15)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {processing ? "Processing..." : (
                                        <>
                                            Proceed to Pay
                                            <CreditCard size={24} />
                                        </>
                                    )}
                                </span>
                            </button>

                            <p className="text-[10px] text-center text-neutral-500 font-bold uppercase tracking-widest leading-relaxed">
                                By clicking proceed, you agree to our <br />
                                <span className="text-neutral-400 underline decoration-white/20">Terms of Service</span> & <span className="text-neutral-400 underline decoration-white/20">Privacy Policy</span>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#1A0A0A] flex items-center justify-center text-[#FAAA47]">
                Loading...
            </div>
        }>
            <PaymentContent />
        </Suspense>
    );
};

export default PaymentPage;
