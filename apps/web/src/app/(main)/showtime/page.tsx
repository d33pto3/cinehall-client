"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IconCalendar, 
  IconMapPin, 
  IconClock, 
  IconMovie,
  IconChevronRight,
  IconTicket,
  IconInfoCircle,
  IconSearch,
  IconChevronDown
} from "@tabler/icons-react";
import { fetchSchedule, fetchHalls } from "@/lib/booking-actions";
import { IShow } from "@/lib/booking-types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format, addDays, isSameDay } from "date-fns";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function ShowtimePage() {
  const [shows, setShows] = useState<IShow[]>([]);
  const [halls, setHalls] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedHallId, setSelectedHallId] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  // Generate next 7 days
  const dates = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => addDays(new Date(), i));
  }, []);

  useEffect(() => {
    const loadHalls = async () => {
      try {
        const data = await fetchHalls();
        setHalls(data);
      } catch (err) {
        console.error("Failed to load halls:", err);
      }
    };
    loadHalls();
  }, []);

  useEffect(() => {
    const loadSchedule = async () => {
      setLoading(true);
      try {
        const data = await fetchSchedule({ 
          date: format(selectedDate, "yyyy-MM-dd"),
          hallId: selectedHallId === "all" ? undefined : selectedHallId
        });
        setShows(data);
      } catch (err) {
        console.error("Failed to load schedule:", err);
      } finally {
        setLoading(false);
      }
    };
    loadSchedule();
  }, [selectedDate, selectedHallId]);

  // Group shows by hall
  const groupedShows = useMemo(() => {
    const groups: Record<string, { hall: any, shows: IShow[] }> = {};
    
    shows.forEach(show => {
      const screen = show.screenId as any;
      const hall = screen.hallId;
      const hallId = hall._id;
      
      if (!groups[hallId]) {
        groups[hallId] = { hall, shows: [] };
      }
      groups[hallId].shows.push(show);
    });
    
    return Object.values(groups);
  }, [shows]);

  return (
    <div className="min-h-screen bg-transparent text-white pb-20">
      {/* Hero Header */}
      <section className="relative h-[30vh] flex flex-col items-center justify-center overflow-hidden px-4">
          <div className="absolute inset-0 z-0">
             <Image 
               src="/feat-videobg.jpg"
               alt="Showtime Background"
               fill
               className="object-cover opacity-20"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A0A0A]/50 to-[#1A0A0A]" />
          </div>
          <div className="relative z-10 text-center space-y-4">
             <motion.h1 
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-[#FAAA47]"
             >
               Daily Schedule
             </motion.h1>
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-neutral-400 font-bold tracking-[0.3em] uppercase text-xs md:text-sm"
             >
               Find your perfect showtime
             </motion.p>
          </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Date Selector & Filters */}
        <div className="z-40 bg-[#1A0A0A]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-4 md:p-6 shadow-2xl flex flex-col md:flex-row gap-6 items-center justify-between mt-4">
          
          {/* Calendar Strip */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar w-full md:w-auto p-2">
            {dates.map((date, i) => {
              const isActive = isSameDay(date, selectedDate);
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "flex flex-col items-center justify-center min-w-[70px] h-20 rounded-2xl transition-all duration-300 border",
                    isActive 
                      ? "bg-[#FAAA47] border-[#FAAA47] text-[#1A0A0A] scale-110" 
                      : "bg-white/5 border-white/10 text-neutral-400 hover:border-[#FAAA47]/50 hover:cursor-pointer"
                  )}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">{format(date, "EEE")}</span>
                  <span className="text-xl font-black">{format(date, "dd")}</span>
                </button>
              );
            })}
          </div>

          <div className="h-px md:h-12 w-full md:w-px bg-white/10" />

          {/* Hall Filter */}
          <div className="relative w-full md:w-72">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAAA47]">
               <IconMapPin size={20} />
            </div>
            <select
              value={selectedHallId}
              onChange={(e) => setSelectedHallId(e.target.value)}
              className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-10 text-white font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-[#FAAA47] transition-all"
            >
              <option value="all" className="bg-[#1A0A0A]">All Cinemas</option>
              {halls.map(hall => (
                <option key={hall._id} value={hall._id} className="bg-[#1A0A0A]">
                  {hall.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
               <IconChevronDown size={20} />
            </div>
          </div>
        </div>

        {/* Schedule List */}
        {loading ? (
          <div className="grid gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="h-8 bg-white/5 rounded-xl w-48" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-48 bg-white/5 rounded-[2.5rem]" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : groupedShows.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {groupedShows.map((group, groupIdx) => (
              <motion.div key={group.hall._id} variants={itemVariants} className="space-y-8">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-[#FAAA47]/10 rounded-2xl border border-[#FAAA47]/20">
                      <IconMapPin className="text-[#FAAA47]" size={28} />
                   </div>
                   <div>
                      <h2 className="text-3xl font-black uppercase tracking-tight">{group.hall.name}</h2>
                      <p className="text-neutral-500 font-bold text-xs uppercase tracking-[0.2em]">{group.hall.address}</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {group.shows.map((show) => {
                     const movie = show.movieId as any;
                     return (
                       <motion.div
                         key={show._id}
                         whileHover={{ y: -5 }}
                         className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 hover:bg-white/[0.08] transition-all group overflow-hidden relative"
                       >
                          {/* Background Glow */}
                          <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FAAA47]/5 blur-[60px] rounded-full group-hover:bg-[#FAAA47]/10 transition-colors" />
                          
                          <div className="flex gap-6 relative z-10">
                             <div className="relative w-24 aspect-[2/3] rounded-2xl overflow-hidden shadow-xl border border-white/10 shrink-0">
                                <Image 
                                  src={movie.imageUrl || "/movie_banner_placeholder.jpg"}
                                  alt={movie.title}
                                  fill
                                  className="object-cover"
                                />
                             </div>
                             
                             <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                   <p className="text-[#FAAA47] text-[10px] font-black uppercase tracking-widest mb-1">{movie.genre}</p>
                                   <h3 className="text-xl font-bold leading-tight group-hover:text-[#FAAA47] transition-colors line-clamp-2">{movie.title}</h3>
                                </div>
                                
                                <div className="space-y-3 mt-4">
                                   <div className="flex items-center gap-4">
                                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                                         <IconClock size={16} className="text-[#FAAA47]" />
                                         {format(new Date(show.startTime), "hh:mm a")}
                                      </div>
                                      <div className="h-1 w-1 rounded-full bg-white/20" />
                                      <div className="text-[10px] font-black uppercase tracking-widest text-[#FAAA47]">
                                         ৳{show.basePrice}
                                      </div>
                                   </div>
                                   
                                   <Link 
                                     href={`/booking/${group.hall._id}?movieId=${movie._id}`}
                                     className="flex items-center justify-between w-full h-12 bg-white text-[#1A0A0A] rounded-xl px-4 font-black uppercase tracking-widest text-[10px] hover:bg-[#FAAA47] transition-all active:scale-95"
                                   >
                                      Book Now
                                      <IconChevronRight size={16} />
                                   </Link>
                                </div>
                             </div>
                          </div>
                       </motion.div>
                     );
                   })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center space-y-6 text-center">
             <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-neutral-600 mb-4">
                <IconCalendar size={48} />
             </div>
             <h3 className="text-3xl font-black uppercase tracking-tight">No Shows Found</h3>
             <p className="text-neutral-500 font-bold max-w-sm">We couldn&apos;t find any shows for the selected date and criteria. Please try another date or location.</p>
             <button 
               onClick={() => { setSelectedDate(new Date()); setSelectedHallId("all"); }}
               className="text-[#FAAA47] font-black uppercase tracking-[0.2em] text-xs hover:underline"
             >
               Reset Filters
             </button>
          </div>
        )}

        {/* Info Banner */}
        <section className="bg-gradient-to-r from-[#FAAA47]/10 to-transparent border border-[#FAAA47]/20 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
           <div className="w-20 h-20 bg-[#FAAA47] rounded-3xl flex items-center justify-center rotate-12 shrink-0 shadow-[0_10px_30px_rgba(250,170,71,0.2)]">
              <IconInfoCircle size={40} className="text-[#1A0A0A]" />
           </div>
           <div className="space-y-2 text-center md:text-left">
              <h4 className="text-2xl font-black uppercase text-white">Booking Information</h4>
              <p className="text-neutral-400 font-medium">Tickets booked online are sent instantly to your profile and email. Please arrive 15 minutes before the show start time.</p>
           </div>
        </section>
      </div>
    </div>
  );
}
