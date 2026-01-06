"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { 
  IconSearch, 
  IconMenu2, 
  IconX, 
  IconMovie, 
  IconCalendar, 
  IconChevronRight 
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import UserDropdown from "./UserDropdown";
import { cn } from "@/lib/utils";
import { Movie } from "@/components/homepage/HeroSection";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "Showtime", href: "/showtime" },
  { name: "Food & Drink", href: "/food-drink" },
];

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [filteredResults, setFilteredResults] = useState<Movie[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
        const res = await fetch(`${url}/movie`);
        if (res.ok) {
          const data = await res.json();
          setAllMovies(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch movies for search:", error);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = allMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
      setFilteredResults(filtered);
      setShowDropdown(true);
    } else {
      setFilteredResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery, allMovies]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setShowDropdown(false);
      setIsOpen(false);
    }
  };

  const handleResultClick = (movieId: string) => {
    router.push(`/movies/${movieId}`);
    setSearchQuery("");
    setShowDropdown(false);
    setIsOpen(false);
  };

  return (
    <nav className="text-white px-6 py-2 my-12 relative z-[100]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="relative z-10 block hover:opacity-90 transition-opacity">
            <Image
              src="/cinehall-logo.svg"
              alt="Cinehall Logo"
              width={180}
              height={60}
              className="w-auto h-12 sm:h-16 lg:h-20 object-contain"
              priority
            />
          </Link>

          {/* Search - Desktop */}
          <div className="hidden sm:block relative" ref={searchRef}>
            <Input
              type="text"
              placeholder="Search Movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              onFocus={() => searchQuery.trim() && setShowDropdown(true)}
              className="ml-2 sm:ml-4 px-3 py-5 rounded-[20px] bg-[#46444470] border-none w-full sm:w-64 md:w-80 focus:ring-2 focus:ring-[#FAAA47] transition-all"
              icon={<IconSearch className="text-[#FAAA47] w-5 h-5" />}
            />

            {/* Results Dropdown */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-4 right-0 mt-2 bg-black/80 backdrop-blur-xl border border-white/10 rounded-[24px] shadow-2xl overflow-hidden min-w-[320px]"
                >
                  {filteredResults.length > 0 ? (
                    <div className="p-2">
                       <p className="px-4 py-2 text-[10px] uppercase font-black tracking-widest text-neutral-500 border-b border-white/5 mb-2">
                        Suggested Movies
                       </p>
                      {filteredResults.map((movie) => (
                        <div
                          key={movie._id}
                          onClick={() => handleResultClick(movie._id)}
                          className="flex items-center gap-4 p-3 hover:bg-white/10 hover:cursor-pointer rounded-2xl transition-all group"
                        >
                          <div className="relative w-12 h-16 rounded-lg overflow-hidden shrink-0 border border-white/5">
                            <Image
                              src={movie.imageUrl}
                              alt={movie.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-white group-hover:text-[#FAAA47] transition-colors truncate">
                              {movie.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                               <p className="text-[10px] text-neutral-400 font-medium">{movie.genre}</p>
                               <span className="w-1 h-1 rounded-full bg-neutral-600" />
                               <p className="text-[10px] text-neutral-400">
                                 {new Date(movie.releaseDate).getFullYear()}
                               </p>
                            </div>
                          </div>
                          <IconChevronRight size={18} className="text-neutral-600 group-hover:text-[#FAAA47] transition-colors" />
                        </div>
                      ))}
                      <Link 
                        href={`/movies?search=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setShowDropdown(false)}
                        className="block w-full text-center py-3 text-xs font-bold text-[#FAAA47] hover:bg-white/5 rounded-xl mt-1 transition-colors"
                      >
                        View all results for &quot;{searchQuery}&quot;
                      </Link>
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                       <IconMovie size={32} className="mx-auto text-neutral-600 mb-2" />
                       <p className="text-neutral-400 text-sm font-medium">No movies found</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <UserDropdown />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#FAAA47] p-2 z-50 hover:scale-110 active:scale-95 transition-transform"
          >
            {isOpen ? <IconX size={32} /> : <IconMenu2 size={32} />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-base text-[#CAC1C1] hover:text-white transition-colors font-semibold relative py-1 group",
                pathname === link.href && "text-[#FAAA47]"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute bottom-0 left-0 w-full h-0.5 bg-[#FAAA47] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100",
                pathname === link.href && "scale-x-100"
              )} />
            </Link>
          ))}

          {/* User Dropdown */}
          <UserDropdown />
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/98 z-[110] flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <div className="flex flex-col items-center gap-8 w-full max-w-sm px-6">
          <div className="w-full relative">
            <Input
              type="text"
              placeholder="Search Movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="px-3 py-6 rounded-2xl bg-[#46444470] border-none w-full text-lg"
              icon={<IconSearch className="text-[#FAAA47] w-6 h-6" />}
            />
            {/* Mobile Search Results */}
            {searchQuery.trim().length > 0 && (
              <div className="mt-4 w-full space-y-4 max-h-[40vh] overflow-y-auto no-scrollbar">
                {filteredResults.map((movie) => (
                  <div
                    key={movie._id}
                    onClick={() => handleResultClick(movie._id)}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl"
                  >
                    <div className="relative w-12 h-16 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={movie.imageUrl}
                        alt={movie.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white">{movie.title}</h4>
                      <p className="text-xs text-neutral-400">{movie.genre}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-3xl text-[#CAC1C1] hover:text-[#FAAA47] transition-colors font-black uppercase tracking-tighter",
                  pathname === link.href && "text-[#FAAA47]"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <button 
            onClick={() => setIsOpen(false)}
            className="mt-8 p-4 bg-white/5 rounded-full text-neutral-400 hover:text-white transition-colors"
          >
            <IconX size={32} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
