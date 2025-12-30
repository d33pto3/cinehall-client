"use client"

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Clock } from "lucide-react";
import Image from "next/image";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { fetchSeatsByShow, holdSeats, releaseSeats, fetchScreensByHallMovieDate, fetchAvailableSlots, fetchShowByDetails } from "@/lib/booking-actions";
import { IShow, ISeat, SeatStatus, IScreen, ISlot, Slots, SlotDisplay } from "@/lib/booking-types";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const BookingPage = () => {
  const params = useParams();
  const hallIdRaw = params.hallId;
  const hallId = typeof hallIdRaw === 'string' ? hallIdRaw : hallIdRaw?.[0];
  
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movieId");
  const router = useRouter();

  // Guest ID management
  const [guestId, setGuestId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let id = sessionStorage.getItem("cinehall-guest-id");
      if (!id) {
        id = `guest_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`;
        sessionStorage.setItem("cinehall-guest-id", id);
      }
      setGuestId(id);
    }
  }, []);

  const currentIdentifier = user?._id || guestId;

  const [availableSlots, setAvailableSlots] = useState<ISlot[]>([]);
  const [screens, setScreens] = useState<IScreen[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(false);
  
  // Fetch movie details
  useEffect(() => {
    if (movieId) {
      setLoadingMovie(true);
      const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
      fetch(`${url}/movie/${movieId}`)
        .then(res => res.json())
        .then(data => setMovie(data.data))
        .catch(err => console.error("Error fetching movie:", err))
        .finally(() => setLoadingMovie(false));
    }
  }, [movieId]);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<Slots | null>(null);
  const [selectedScreenId, setSelectedScreenId] = useState<string>("");
  const [selectedShow, setSelectedShow] = useState<IShow | null>(null);

  const [seats, setSeats] = useState<ISeat[]>([]);
  const [loadingSeats, setLoadingSeats] = useState(false);
  const [movie, setMovie] = useState<any>(null);
  const [loadingMovie, setLoadingMovie] = useState(false);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [holdingSeats, setHoldingSeats] = useState(false);
  const [heldUntil, setHeldUntil] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Generate next 5 days
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push(d.toDateString());
    }
    return dates;
  }, []);

  // Initial date selection
  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
        setSelectedDate(availableDates[0]);
    }
  }, [availableDates, selectedDate]);

  // Fetch Slots and Screens when Date changes
  useEffect(() => {
    if (movieId && hallId && selectedDate) {
       setLoadingOptions(true);
       
       Promise.all([
          fetchAvailableSlots(movieId, selectedDate, hallId),
          fetchScreensByHallMovieDate(hallId, movieId, selectedDate)
       ]).then(([slotsData, screensData]) => {
          setAvailableSlots(slotsData || []);
          setScreens(screensData || []);
          setSelectedSlot(null); // Reset on date change
          setSelectedScreenId("");
          setSelectedShow(null);
       }).catch(err => console.error("Error fetching options:", err))
         .finally(() => setLoadingOptions(false));
    }
  }, [movieId, hallId, selectedDate]);

  // Find unique Show whenever Slot or Screen selection changes
  useEffect(() => {
    if (selectedDate && selectedSlot && selectedScreenId) {
        fetchShowByDetails({ date: selectedDate, slot: selectedSlot, screenId: selectedScreenId })
          .then(show => {
             setSelectedShow(show);
          })
          .catch(err => {
            console.error("Error finding show:", err);
            setSelectedShow(null);
          });
    } else {
        setSelectedShow(null);
    }
  }, [selectedDate, selectedSlot, selectedScreenId]);

  // Fetch Seats when Show changes
  useEffect(() => {
    if (selectedShow) {
      setLoadingSeats(true);
      fetchSeatsByShow(selectedShow._id)
        .then((res) => {
          setSeats(res.data.seats);
          setSelectedSeatIds([]); // Reset selection
        })
        .catch((err) => console.error("Failed to fetch seats:", err))
        .finally(() => setLoadingSeats(false));
    } else {
      setSeats([]);
    }
  }, [selectedShow]);

  // Periodic refresh for seat status (every 10s)
  useEffect(() => {
    if (!selectedShow) return;
    
    const intervalId = setInterval(() => {
      fetchSeatsByShow(selectedShow._id)
        .then((res) => {
          setSeats(res.data.seats);
        })
        .catch((err) => console.error("Failed to refresh seats:", err));
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(intervalId);
  }, [selectedShow]);

  // Countdown timer for held seats
  useEffect(() => {
    if (!heldUntil) {
      setTimeRemaining(0);
      return;
    }

    const updateTimer = () => {
      const now = new Date().getTime();
      const untilTime = new Date(heldUntil).getTime();
      const diff = Math.max(0, Math.floor((untilTime - now) / 1000));
      setTimeRemaining(diff);

      if (diff === 0) {
        // Hold expired, refresh seats
        if (selectedShow) {
          fetchSeatsByShow(selectedShow._id)
            .then((res) => {
              setSeats(res.data.seats);
              setSelectedSeatIds([]);
              setHeldUntil(null);
            })
            .catch((err) => console.error("Failed to refresh seats:", err));
        }
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
    return () => clearInterval(timerId);
  }, [heldUntil, selectedShow]);

  // Release seats on component unmount
  useEffect(() => {
    return () => {
      if (selectedShow && selectedSeatIds.length > 0 && currentIdentifier) {
        releaseSeats(selectedShow._id, selectedSeatIds, currentIdentifier).catch((err) =>
          console.error("Failed to release seats on unmount:", err)
        );
      }
    };
  }, [selectedShow, selectedSeatIds, currentIdentifier]);

  const toggleSeat = async (seat: ISeat) => {
    if (!currentIdentifier) return;

    // Don't allow selection if seat is booked or held by someone else
    if (seat.status === SeatStatus.BOOKED) return;
    if (seat.isHeld && seat.heldBy && seat.heldBy !== currentIdentifier) return;

    const seatId = seat._id;
    const isCurrentlySelected = selectedSeatIds.includes(seatId);

    try {
      if (isCurrentlySelected) {
        // Release this seat
        setHoldingSeats(true);
        await releaseSeats(selectedShow!._id, [seatId], currentIdentifier);
        
        // Update local state
        setSelectedSeatIds((prev) => prev.filter((id) => id !== seatId));
        
        // Refresh seats to get updated status
        const res = await fetchSeatsByShow(selectedShow!._id);
        setSeats(res.data.seats);
        
        // If no more seats selected, clear hold timer
        if (selectedSeatIds.length === 1) {
          setHeldUntil(null);
        }
      } else {
        // Hold this seat
        setHoldingSeats(true);
        const response = await holdSeats(selectedShow!._id, [seatId], currentIdentifier);
        
        // Update local state
        setSelectedSeatIds((prev) => [...prev, seatId]);
        setHeldUntil(new Date(response.data.heldUntil));
        
        // Refresh seats to get updated status
        const res = await fetchSeatsByShow(selectedShow!._id);
        setSeats(res.data.seats);
      }
    } catch (err) {
      console.error("Seat toggle failed:", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to select/deselect seat");
      } else {
        alert("An error occurred");
      }
      
      // Refresh seats to ensure UI is in sync with server
      if (selectedShow) {
        fetchSeatsByShow(selectedShow._id)
          .then((res) => setSeats(res.data.seats))
          .catch((err) => console.error("Failed to refresh seats:", err));
      }
    } finally {
      setHoldingSeats(false);
    }
  };

  const handlePayNow = async () => {
    if (!selectedShow || selectedSeatIds.length === 0 || !currentIdentifier) return;

    // Verify seats are still held
    if (timeRemaining === 0) {
      alert("Your seat hold has expired. Please select seats again.");
      setSelectedSeatIds([]);
      setHeldUntil(null);
      return;
    }

    try {
      setProcessingPayment(true);
      
      // Seats are already held, just redirect to payment
      const seatsParam = selectedSeatIds.join(",");
      router.push(`/payment?showId=${selectedShow._id}&seatIds=${seatsParam}&amount=${totalAmount}${!user ? `&guestId=${guestId}` : ""}`);
    } catch (err) {
      console.error("Payment initiation failed:", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to initiate payment");
      }
    } finally {
      setProcessingPayment(false);
    }
  };

  // Group seats by Row for rendering
  const seatsByRow = React.useMemo(() => {
    const grouped: Record<string, ISeat[]> = {};
    // Sort seats: Row (desc/asc?) -> Column
    // Assuming Row is "A", "B"... and Column is 1, 2...
    seats.forEach(seat => {
        if (!grouped[seat.row]) grouped[seat.row] = [];
        grouped[seat.row].push(seat);
    });
    // Sort columns within rows
    Object.keys(grouped).forEach(row => {
        grouped[row].sort((a, b) => a.column - b.column);
    });
    // Sort rows if needed (e.g. A at front or back?)
    // Usually A is at the bottom (Screen is at front). The mock had 'J' at top, 'A' at bottom.
    // So we sort keys reverse?
    return grouped;
  }, [seats]);
  
  const sortedRows = Object.keys(seatsByRow).sort(); // A, B, C...

  // Calculate total
  const totalAmount = selectedShow ? selectedSeatIds.length * selectedShow.basePrice : 0;



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
                    src={movie?.imageUrl || "/movie_banner_placeholder.jpg"} 
                    alt={movie?.title || "Movie Banner"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
            </div>
            <div className="flex-1 p-8 flex flex-col justify-center gap-2">
              <h3 className="text-4xl font-extrabold text-white">
                {loadingMovie ? <Skeleton className="h-10 w-64" /> : movie?.title || "N/A"}
              </h3>
              <p className="text-[#FAAA47] font-medium text-lg">
                {loadingMovie ? <Skeleton className="h-6 w-32" /> : movie?.genre || ""}
              </p>
              <div className="flex items-center gap-6 text-sm text-neutral-400 font-bold uppercase tracking-widest mt-2">
                <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                  <Clock size={16} className="text-[#FAAA47]" /> 
                  {loadingMovie ? <Skeleton className="h-4 w-16" /> : movie?.duration ? `${Math.floor(movie.duration / 60)}h ${movie.duration % 60}m` : "N/A"}
                </span>
                <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                  <Star size={16} className="text-[#FAAA47] fill-[#FAAA47]" /> 
                  {loadingMovie ? <Skeleton className="h-4 w-8" /> : movie?.rating || "N/A"}
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Select Date and Time */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold tracking-wider uppercase">Select Date and Time</h2>
          {loadingOptions ? (
             <div className="space-y-8">
                <div className="flex flex-wrap gap-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-32 rounded-xl" />
                  ))}
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex flex-wrap gap-4">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-16 w-32 rounded-xl" />
                    ))}
                  </div>
                </div>
             </div>
          ) : (
            <div className="space-y-8">
                {/* Date Picker */}
                <div className="flex flex-wrap gap-4">
                  {availableDates.map((date) => (
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

                {/* Slot Picker (Absolute) */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Available Slots</h3>
                  <div className="flex flex-wrap gap-4">
                  {Object.values(Slots).map((slot) => {
                      const availability = availableSlots.find(s => s.slot === slot);
                      const isAvailable = availability && availability.showCount > 0;
                      const isSelected = selectedSlot === slot;

                      return (
                          <button
                            key={slot}
                            disabled={!isAvailable}
                            onClick={() => setSelectedSlot(slot)}
                            className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 border-2 transform active:scale-95 flex flex-col items-center min-w-[120px] ${
                                !isAvailable 
                                ? "opacity-30 cursor-not-allowed border-transparent bg-neutral-800 text-neutral-600"
                                : isSelected
                                ? "bg-[#1A0A0A] border-[#FAAA47] text-[#FAAA47] shadow-[0_0_15px_rgba(250,170,71,0.2)]" 
                                : "bg-transparent border-white/10 text-neutral-500 hover:border-white/30"
                            }`}
                          >
                            <span className="text-lg">{SlotDisplay[slot]}</span>
                            <span className="text-[10px] uppercase opacity-70 mt-1">{slot}</span>
                          </button>
                      );
                  })}
                  </div>
                </div>

                {/* Screen Picker */}
                {selectedSlot && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Select Screen</h3>
                    <div className="flex flex-wrap gap-4">
                      {screens.map((screen) => (
                        <button
                          key={screen._id}
                          onClick={() => setSelectedScreenId(screen._id)}
                          className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 border-2 transform active:scale-95 ${
                            selectedScreenId === screen._id
                            ? "bg-[#FAAA47] text-[#4A2C2C]"
                            : "bg-transparent border-white/10 text-neutral-500 hover:border-white/30"
                          }`}
                        >
                          {screen.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </section>

        {/* Seat Selection */}
        {selectedShow && (
        <section className="space-y-8">
             <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <h2 className="text-2xl font-bold tracking-wider uppercase">Select Your Seats</h2>
                <div className="flex flex-wrap gap-6 text-xs font-bold uppercase tracking-widest text-[#CAC1C1]">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-[#FAAA47]" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-[#D35400]" />
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-sm bg-neutral-600" />
                    <span>Booked/Held</span>
                  </div>
                </div>
            </div>

            {/* Hold Timer Display */}
            {selectedSeatIds.length > 0 && timeRemaining > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-center p-4 rounded-xl border-2 ${
                  timeRemaining <= 60 
                    ? 'bg-red-900/20 border-red-500/50 text-red-400' 
                    : 'bg-[#4A2C2C]/40 border-[#FAAA47]/30 text-[#FAAA47]'
                }`}
              >
                <p className="text-sm font-bold uppercase tracking-widest">
                  Seats Reserved - Time Remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </p>
                {timeRemaining <= 60 && (
                  <p className="text-xs mt-1 text-red-300">⚠️ Hurry! Your reservation will expire soon</p>
                )}
              </motion.div>
            )}

            <div className="overflow-x-auto pb-8 custom-scrollbar">
                <div className="min-w-[900px] bg-[#2D1B1B] p-12 rounded-[40px] border border-white/5 shadow-inner relative">
                    <div className="text-center mb-16 space-y-2">
                        <p className="text-xs font-bold text-neutral-500 uppercase tracking-[0.5em]">
                            Base Price : BDT {selectedShow.basePrice}
                        </p>
                    </div>

                    {loadingSeats ? (
                        <div className="space-y-4">
                             {[...Array(8)].map((_, r) => (
                                 <div key={r} className="flex items-center justify-center gap-2">
                                     <Skeleton className="w-8 h-4 mr-4" />
                                     <div className="flex gap-1">
                                         {[...Array(12)].map((_, c) => (
                                             <Skeleton key={c} className="w-8 h-8 rounded-[4px]" />
                                         ))}
                                     </div>
                                 </div>
                             ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {sortedRows.map(row => (
                                <div key={row} className="flex items-center justify-center gap-2">
                                    <span className="w-8 text-sm font-black text-neutral-500 mr-4">{row}</span>
                                    <div className="flex gap-1">
                                        {seatsByRow[row].map(seat => {
                                            const isSelected = selectedSeatIds.includes(seat._id);
                                            // Check status
                                            const isBooked = seat.status === SeatStatus.BOOKED;
                                            const isHeldByOthers = seat.isHeld && seat.heldBy && seat.heldBy.toString() !== currentIdentifier;
                                            const isHeldByMe = seat.isHeld && seat.heldBy && seat.heldBy.toString() === currentIdentifier;
                                            
                                            const isTaken = isBooked || isHeldByOthers;
                                            
                                            let statusColor = "bg-[#FAAA47] text-[#4A2C2C] hover:bg-[#FAAA47]/80"; // Available
                                            let cursor = "cursor-pointer";

                                            if (isTaken) {
                                                statusColor = "bg-neutral-600 text-neutral-400";
                                                cursor = "cursor-not-allowed";
                                            } else if (isSelected || isHeldByMe) {
                                                statusColor = "bg-[#D35400] text-white shadow-[0_0_10px_rgba(211,84,0,0.5)]";
                                            }

                                            return (
                                                <button
                                                    key={seat._id}
                                                    disabled={!!isTaken || holdingSeats}
                                                    onClick={() => toggleSeat(seat)}
                                                    className={`w-8 h-8 rounded-[4px] text-[10px] flex items-center justify-center font-bold transition-all duration-300 transform ${
                                                        !isTaken ? 'hover:scale-110 active:scale-90' : ''
                                                    } ${statusColor} ${cursor}`}
                                                >
                                                    {seat.seatNumber || seat.column} 
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                 
                 {/* Screen Viz */}
                 <div className="mt-20 flex flex-col items-center">
                    <div className="w-[60%] h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full mb-4 shadow-[0_10px_30px_rgba(255,255,255,0.1)]" />
                    <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[1em]">Theatre Screen</p>
                 </div>
                </div>
            </div>
        </section>
        )}

        {/* Ticket / Pay Section */}
        {selectedShow && selectedSeatIds.length > 0 && (
            <section className="space-y-8 pb-20">
                <h2 className="text-2xl font-bold tracking-wider uppercase">Your Tickets</h2>
                 <div className="flex justify-center">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="relative w-full max-w-md bg-[#FAAA47] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(250,170,71,0.2)] flex flex-col p-8"
                      >
                           <div className="text-center space-y-4">
                               <p className="text-[#4A2C2C] text-2xl font-black">{selectedSeatIds.length} Seats Selected</p>
                               <p className="text-[#4A2C2C]/70 text-lg font-bold">Total: BDT {totalAmount}</p>
                               <button 
                                onClick={handlePayNow}
                                disabled={processingPayment}
                                className="w-full py-4 bg-[#800000] hover:bg-[#a00000] text-white font-black text-xl rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-widest disabled:opacity-50">
                                   {processingPayment ? "Processing..." : "Pay Now"}
                               </button>
                           </div>
                      </motion.div>
                 </div>
            </section>
        )}

      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1A0A0A; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4A2C2C; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #FAAA4733; }
      `}</style>
    </div>
  );
};

export default BookingPage;
