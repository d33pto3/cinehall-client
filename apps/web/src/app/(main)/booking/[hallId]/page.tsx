"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Star, MapPin, Calendar, Clock, Monitor } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";

// Mock types for the UI
interface Seat {
  id: string;
  row: string;
  number: number;
  status: "available" | "selected" | "taken";
  price: number;
}

const BookingPage = () => {
  const { hallId } = useParams();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movieId");

  const [ticketQuantity, setTicketQuantity] = useState(4);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("Tomorrow");
  const [selectedTime, setSelectedTime] = useState("05:30 PM");
  const [selectedScreen, setSelectedScreen] = useState("Screen 1");

  // Mock data for the UI
  const movieData = {
    title: "Superman (2025)",
    genre: "Action/Sci-fi",
    duration: "2 hr 9 min",
    rating: "7.2/10",
    imageUrl: "/movie_banner_placeholder.jpg", // Replace with real image if available
  };

  const dates = ["Today", "Tomorrow", "Sat, July 14", "Sun, July 15", "Mon, July 16"];
  const times = ["10:00 AM", "12:30 PM", "03:00 PM", "05:30 PM", "08:00 PM"];
  const screens = [
    { id: "1", name: "Screen 1", type: "Dolby Atmos", seats: 160 },
    { id: "2", name: "Screen 2", type: "3D Experience", seats: 120 },
    { id: "3", name: "Screen 3", type: "Standard", seats: 240 },
  ];

  const rows = ["J", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
  const seatsPerRow = 24;

  const toggleSeat = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  return (
    <div className="min-h-screen bg-[#1A0A0A] text-[#FAAA47] p-6 md:p-12 font-sans selection:bg-[#FAAA47] selection:text-[#1A0A0A]">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Selected Movie Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-wider uppercase text-[#FAAA47]">Selected Movie</h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4A2C2C] to-[#2D1B1B] border border-white/10 shadow-2xl flex flex-col md:flex-row h-auto md:h-48 group"
          >
            <div className="relative w-full md:w-64 h-48 md:h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#4A2C2C] z-10 hidden md:block" />
                <Image 
                    src="/superman-banner.jpg" // Change this to a real one later
                    alt="Movie Banner"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </div>
            <div className="flex-1 p-8 flex flex-col justify-center gap-2">
              <h3 className="text-4xl font-extrabold text-white">{movieData.title}</h3>
              <p className="text-[#FAAA47] font-medium text-lg">{movieData.genre}</p>
              <div className="flex items-center gap-6 text-sm text-neutral-400 font-bold uppercase tracking-widest mt-2">
                <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                  <Clock size={16} className="text-[#FAAA47]" /> {movieData.duration}
                </span>
                <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                  <Star size={16} className="text-[#FAAA47] fill-[#FAAA47]" /> {movieData.rating}
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Select Date and Time */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold tracking-wider uppercase">Select Date and Time</h2>
          
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              {dates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 ${
                    selectedDate === date 
                    ? "bg-[#FAAA47] text-[#4A2C2C] shadow-[0_0_20px_rgba(250,170,71,0.3)] scale-105" 
                    : "bg-[#4A2C2C]/40 text-neutral-400 hover:bg-[#4A2C2C]/60 border border-white/5"
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {times.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 border-2 transform active:scale-95 ${
                    selectedTime === time 
                    ? "bg-[#1A0A0A] border-[#FAAA47] text-[#FAAA47] shadow-[0_0_15px_rgba(250,170,71,0.2)]" 
                    : "bg-transparent border-white/10 text-neutral-500 hover:border-white/30"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Select Your Screen */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-wider uppercase">Select Your Screen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {screens.map((screen) => (
              <button
                key={screen.id}
                onClick={() => setSelectedScreen(screen.name)}
                className={`p-6 rounded-3xl flex flex-col items-center justify-center gap-2 transition-all duration-500 border-2 group ${
                  selectedScreen === screen.name
                  ? "bg-gradient-to-br from-[#E67E22] to-[#D35400] border-transparent text-white shadow-2xl scale-105"
                  : "bg-neutral-800/50 border-white/5 text-neutral-400 hover:bg-neutral-800 hover:border-white/10"
                }`}
              >
                <span className="text-2xl font-black">{screen.name}</span>
                <span className={`text-sm font-bold opacity-80 ${selectedScreen === screen.name ? 'text-white' : 'text-neutral-500'}`}>
                    {screen.type}
                </span>
                <span className={`text-xs font-medium px-4 py-1 rounded-full mt-2 ${
                    selectedScreen === screen.name ? 'bg-white/20' : 'bg-white/5 text-neutral-500'
                }`}>
                    {screen.seats} Seats
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Select Your Seats */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-2xl font-bold tracking-wider uppercase">Select Your Seats</h2>
            <div className="flex items-center gap-8 bg-black/30 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-neutral-400 uppercase tracking-widest">Ticket Quantity</span>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))} className="p-1 hover:text-white transition-colors border border-white/20 rounded-md">
                        <Minus size={18} />
                    </button>
                    <span className="text-2xl font-black text-white w-8 text-center">{ticketQuantity}</span>
                    <button onClick={() => setTicketQuantity(ticketQuantity + 1)} className="p-1 hover:text-white transition-colors border border-white/20 rounded-md">
                        <Plus size={18} />
                    </button>
                  </div>
                </div>
                <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-[#D35400] rounded-sm" />
                        <span className="text-xs font-bold text-neutral-400">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-[#FAAA47] rounded-sm" />
                        <span className="text-xs font-bold text-neutral-400">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-neutral-600 rounded-sm" />
                        <span className="text-xs font-bold text-neutral-400">Taken</span>
                    </div>
                </div>
            </div>
          </div>

          <div className="overflow-x-auto pb-8 custom-scrollbar">
            <div className="min-w-[900px] bg-[#2D1B1B] p-12 rounded-[40px] border border-white/5 shadow-inner relative">
              {/* Screen labels */}
              <div className="text-center mb-16 space-y-2">
                 <p className="text-xs font-bold text-neutral-500 uppercase tracking-[0.5em]">Premium : BDT 500</p>
              </div>

              {/* Seat Grid */}
              <div className="space-y-4">
                {rows.map((row, rowIndex) => (
                  <div key={row} className="flex items-center justify-center gap-2">
                    <span className="w-8 text-sm font-black text-neutral-500 mr-4">{row}</span>
                    <div className="flex items-center gap-1">
                      {/* Left Block */}
                      <div className="flex gap-1 mr-8">
                        {[24, 23, 22].map(num => renderSeat(row, num))}
                      </div>
                      {/* Center Block */}
                      <div className="flex gap-1">
                         {[21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4].map(num => renderSeat(row, num))}
                      </div>
                      {/* Right Block */}
                      <div className="flex gap-1 ml-8">
                         {[3, 2, 1].map(num => renderSeat(row, num))}
                      </div>
                    </div>
                    {/* Add labels between categories */}
                    {row === 'E' && (
                        <div className="absolute left-0 right-0 py-8 pointer-events-none">
                             <div className="h-[1px] bg-white/5 w-full mb-8" />
                             <p className="text-center text-xs font-bold text-neutral-500 uppercase tracking-[0.5em]">Executive : BDT 420</p>
                        </div>
                    )}
                    {row === 'B' && (
                        <div className="absolute left-0 right-0 py-8 pointer-events-none">
                             <div className="h-[1px] bg-white/5 w-full mb-8" />
                             <p className="text-center text-xs font-bold text-neutral-500 uppercase tracking-[0.5em]">Normal : BDT 360</p>
                        </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Theatre Screen Visualization */}
              <div className="mt-20 flex flex-col items-center">
                <div className="w-[60%] h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full mb-4 shadow-[0_10px_30px_rgba(255,255,255,0.1)]" />
                <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[1em]">Theatre Screen</p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Tickets Section */}
        <section className="space-y-8 pb-20">
          <h2 className="text-2xl font-bold tracking-wider uppercase">Your Tickets</h2>
          <div className="flex justify-center">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative w-full max-w-md aspect-[16/9] bg-[#FAAA47] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(250,170,71,0.2)] flex flex-col"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 5% 50%)" // Just a hint of a ticket shape
              }}
            >
               {/* Using CSS instead of complex clip path for the ticket notches */}
               <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1A0A0A] -ml-4" />
               <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1A0A0A] -mr-4" />
               
               <div className="p-8 flex flex-col items-center flex-1">
                  <div className="flex gap-6 w-full items-center mb-6">
                    <div className="w-16 h-20 bg-neutral-800 rounded-lg overflow-hidden relative">
                         <Image src="/superman-banner.jpg" alt="Poster" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-[#4A2C2C] text-2xl font-black">{movieData.title}</h4>
                        <p className="text-[#4A2C2C]/70 text-xs font-bold leading-tight mt-1 uppercase">
                            Bashundhara Shopping Mall, <br />
                            Level 5, Panthapath, Dhaka
                        </p>
                        <p className="text-[#4A2C2C]/80 text-xs font-black mt-2">
                             July 13, 2025 (Friday) | 05:30 PM
                        </p>
                    </div>
                  </div>

                  <div className="w-full h-[2px] bg-black/10 border-t-2 border-dashed border-[#4A2C2C]/20 mb-6" />

                  <div className="text-center space-y-1">
                    <p className="text-[#4A2C2C] text-2xl font-black">
                        {selectedSeats.length > 0 ? selectedSeats.join(", ") : "I10, I11, I12, I13"}
                    </p>
                    <p className="text-[#4A2C2C]/70 text-sm font-bold uppercase tracking-widest">
                        Total Amount: BDT {selectedSeats.length * 500 || 2000}
                    </p>
                  </div>
                  
                  <div className="mt-6 w-full">
                    <button className="w-full py-4 bg-[#800000] hover:bg-[#a00000] text-white font-black text-xl rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-widest">
                        Pay Now
                    </button>
                  </div>
               </div>
            </motion.div>
          </div>
        </section>

      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1A0A0A;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4A2C2C;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #FAAA4733;
        }
      `}</style>
    </div>
  );

  function renderSeat(row: string, num: number) {
    const seatId = `${row}${num}`;
    const isSelected = selectedSeats.includes(seatId);
    const isTaken = [/* Mock taken seats */].includes(seatId);

    return (
      <button
        key={seatId}
        onClick={() => !isTaken && toggleSeat(seatId)}
        className={`w-5 h-5 md:w-6 md:h-6 rounded-[4px] text-[8px] md:text-[10px] flex items-center justify-center font-bold transition-all duration-300 transform hover:scale-110 active:scale-90 ${
          isTaken 
          ? "bg-neutral-600 cursor-not-allowed text-neutral-400" 
          : isSelected 
          ? "bg-[#D35400] text-white shadow-[0_0_10px_rgba(211,84,0,0.5)]" 
          : "bg-[#FAAA47] text-[#4A2C2C] hover:bg-[#FAAA47]/80"
        }`}
      >
        {num}
      </button>
    );
  }
};

export default BookingPage;
