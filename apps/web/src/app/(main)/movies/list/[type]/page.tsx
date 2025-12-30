"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  IconMovie, 
  IconCalendar, 
  IconClock,
  IconArrowLeft
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { Movie } from "@/components/homepage/HeroSection";

export default function MovieListPage() {
  const params = useParams();
  const type = params.type as string; // 'now-showing' or 'coming-soon'
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const title = type === "now-showing" ? "Now Showing" : "Coming Soon";
  const subtitle = type === "now-showing" 
    ? "Experience the latest blockbusters on the big screen today." 
    : "Be the first to see the most anticipated releases coming your way.";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
        const endpoint = type === "now-showing" ? "/movie/now-showing" : "/movie/coming-soon";
        const res = await fetch(`${url}${endpoint}`);
        
        if (res.ok) {
          const data = await res.json();
          setMovies(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (type) {
      fetchMovies();
    }
  }, [type]);

  return (
    <div className="min-h-screen bg-[#171717] pb-20">
      {/* Header */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/feat-videobg.jpg"
            alt="Hero Background"
            fill
            className="opacity-20 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#171717]/80 to-[#171717]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-[#FAAA47] hover:underline mb-8 transition-all group"
          >
            <IconArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-[#FAAA47] mb-4 italic uppercase tracking-tighter"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#CAC1C1] text-lg max-w-2xl mx-auto font-medium"
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-[#2A2A2A] aspect-[2/3] rounded-2xl mb-4"></div>
                <div className="bg-[#2A2A2A] h-6 rounded w-3/4 mb-2"></div>
                <div className="bg-[#2A2A2A] h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : movies.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {movies.map((movie) => (
                <motion.div
                  key={movie._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group"
                >
                  <Link href={`/movies/${movie._id}`}>
                    <div className="relative aspect-[2/3] overflow-hidden rounded-2xl shadow-2xl border border-white/5 transition-all duration-500 group-hover:border-[#FAAA47]/50 group-hover:-translate-y-2">
                      <Image
                        src={movie.imageUrl}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      />
                      
                      {/* Hover Info Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center text-[10px] text-[#FAAA47] font-black uppercase tracking-widest">
                              <IconMovie size={12} className="mr-1" /> {movie.genre}
                            </span>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-[10px] text-white font-bold flex items-center">
                                <IconClock size={12} className="mr-1 shadow-sm" /> {movie.duration}M
                              </span>
                              <span className="text-[10px] text-white font-bold flex items-center">
                                <IconCalendar size={12} className="mr-1 shadow-sm" /> {new Date(movie.releaseDate).getFullYear()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="mt-4">
                    <Link href={`/movies/${movie._id}`}>
                      <h3 className="font-black text-white italic uppercase truncate group-hover:text-[#FAAA47] transition-colors leading-tight">
                        {movie.title}
                      </h3>
                    </Link>
                    <p className="text-[10px] font-bold text-[#6A6A6A] mt-1 uppercase tracking-widest">
                      {movie.director}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-black text-white mb-2 uppercase italic">No Movies Found</h3>
            <p className="text-[#CAC1C1] font-medium">Check back soon for newer updates!</p>
          </div>
        )}
      </section>
    </div>
  );
}
