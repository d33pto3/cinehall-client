"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  IconSearch, 
  IconMovie, 
  IconCalendar, 
  IconClock,
  IconTicket
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Movie } from "@/components/homepage/HeroSection";
import { motion, AnimatePresence } from "framer-motion";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function MoviesContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [genres, setGenres] = useState<string[]>(["All"]);

  // Update searchQuery if URL param changes
  useEffect(() => {
    const s = searchParams.get("search");
    if (s !== null) setSearchQuery(s);
  }, [searchParams]);


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
        const res = await fetch(`${url}/movie`);
        if (res.ok) {
          const data = await res.json();
          const moviesList = data.data;
          setMovies(moviesList);
          
          // Extract unique genres
          const extractedGenres = ["All", ...new Set(moviesList.map((m: Movie) => m.genre)) as any];
          setGenres(extractedGenres);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/feat-videobg.jpg"
            alt="Movies Hero"
            fill
            className="opacity-30 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#171717]/50 to-[#171717]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-[#FAAA47] mb-4 drop-shadow-2xl"
          >
            Explore Movies
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#CAC1C1] text-lg md:text-xl max-w-2xl mx-auto"
          >
            From blockbuster hits to indie gems, find your next favorite cinematic experience.
          </motion.p>
        </div>
      </section>

      {/* Control Bar (Search & Filter) */}
      <section className="sticky top-0 z-30 bg-[#171717]/80 backdrop-blur-md border-y border-white/5 py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Input
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-2 h-12 bg-[#2A2A2A] border-none text-white rounded-xl focus:ring-2 focus:ring-[#FAAA47]"
              icon={<IconSearch size={20} className="text-[#FAAA47]" />}
            />
          </div>
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={cn(
                  "px-6 py-2 rounded-full whitespace-nowrap transition-all duration-300 border font-medium text-sm",
                  selectedGenre === genre
                    ? "bg-[#FAAA47] text-black border-[#FAAA47]"
                    : "bg-[#2A2A2A] text-[#CAC1C1] border-white/10 hover:border-[#FAAA47]/50"
                )}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
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
        ) : filteredMovies.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
            id="movie-list"
          >
            <AnimatePresence mode="popLayout">
              {filteredMovies.map((movie) => (
                <motion.div
                  key={movie._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative"
                >
                  <Link href={`/movies/${movie._id}`}>
                    <div className="relative aspect-[2/3] overflow-hidden shadow-2xl border border-white/5 transition-all duration-500 group-hover:border-[#FAAA47]/50 group-hover:shadow-[#FAAA47]/10 group-hover:-translate-y-2">
                      <Image
                        src={movie.imageUrl}
                        alt={movie.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex flex-col gap-2">
                            <span className="flex items-center text-xs text-[#FAAA47] font-semibold">
                              <IconMovie size={14} className="mr-1" /> {movie.genre}
                            </span>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-white flex items-center">
                                <IconClock size={14} className="mr-1" /> {movie.duration}m
                              </span>
                              <span className="text-xs text-white flex items-center">
                                <IconCalendar size={14} className="mr-1" /> {new Date(movie.releaseDate).getFullYear()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Badge */}
                      <div className="absolute top-3 right-3 bg-[#FAAA47] text-black text-[10px] font-bold px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
                        READY TO BOOK
                      </div>
                    </div>
                  </Link>
                  
                  <div className="mt-4">
                    <Link href={`/movies/${movie._id}`}>
                      <h3 className="font-bold text-lg text-white truncate group-hover:text-[#FAAA47] transition-colors">
                        {movie.title}
                      </h3>
                    </Link>
                    <p className="flex items-center mt-1 text-sm text-[#6A6A6A]">
                      {movie.director}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-[#2A2A2A] rounded-full flex items-center justify-center mx-auto mb-6 text-[#6A6A6A]">
              <IconSearch size={48} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Movies Found</h3>
            <p className="text-[#CAC1C1]">Try adjusting your search or filters to find what you're looking for.</p>
            <Button 
              variant="outline" 
              className="mt-6 border-[#3A3A3A] text-white hover:bg-[#3A3A3A]"
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("All");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </section>

      {/* Featured Section / CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 border-t border-white/5">
        <div className="bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FAAA47] opacity-5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="flex-1 z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Can't decide what to watch tonight?
            </h2>
            <p className="text-[#CAC1C1] text-lg mb-8 max-w-xl">
              Check out our "Now Showing" section to see what's trending and secure your seats instantly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-[#FAAA47] text-black hover:bg-[#F97316] h-14 px-8 rounded-2xl font-bold text-lg hover:cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Start Exploring
              </Button>
              <Button 
                variant="outline" 
                className="border-white/10 text-black hover:bg-[#FAAA47]/5 hover:text-white hover:cursor-pointer h-14 px-8 rounded-2xl font-bold text-lg"
              >
                View Showtimes
              </Button>
            </div>
          </div>
          
          <div className="w-full md:w-1/3 relative aspect-square md:aspect-auto md:h-80 z-10">
            <div className="relative w-full h-full bg-[#3A3A3A] rounded-3xl border border-white/10 flex items-center justify-center p-8 overflow-hidden">
               <IconTicket size={120} className="text-[#FAAA47] rotate-12 opacity-80" />
               <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-medium border border-white/10">
                 Instant E-Tickets
               </div>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default function MoviesExplorerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#171717] flex items-center justify-center text-[#FAAA47]">Loading Movies...</div>}>
      <MoviesContent />
    </Suspense>
  );
}

