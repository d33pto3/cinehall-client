"use client";

import React, { useEffect, useState } from "react";
import MovieCarousel from "./MovieCarousel";

import NowShowing from "./NowShowing";
import ComingSoon from "./ComingSoon";
import Image from "next/image";

interface HeroSectionProps {
  empty?: true;
}

export interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
  duration: number;
  genre: string;
  releaseDate: string;
  director: string;
}

const HeroSection = ({}: HeroSectionProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
        const res = await fetch(`${url}/movie`, {
          // Include credentials if needed, but be careful if backend strictly requires them for non-auth endpoints
          // mode: 'cors', // default
        });
        
        if (!res.ok) {
           throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const moviesList = data.data;

        setMovies(moviesList);
        setImageUrls(moviesList.map((movie: Movie) => movie.imageUrl));
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className="min-h-screen">
      {/* Content */}
      <MovieCarousel slides={imageUrls} />
      <NowShowing movies={movies} />
      <ComingSoon movies={movies} />
      {/* Footer top */}
      <div className="w-full h-[228px] lg:h-[400px] relative overflow-hidden bg-black mt-12">
        <Image
          src={"/footer-top.jpg"}
          alt="cinehall-footertop"
          fill
          className="object-cover object-center opacity-60"
        />
        <div className="absolute left-[5%] -bottom-10 lg:bottom-[-20%] w-[180px] sm:w-[250px] lg:w-[500px] z-10 transition-all duration-500">
          <Image
            src={"/popcorn.png"}
            alt="cinehall-popcorn"
            width={528}
            height={428}
            className="object-contain w-full h-auto"
          />
        </div>
        <div className="absolute right-[5%] lg:right-[10%] top-1/2 -translate-y-1/2 text-right z-20">
          <div className="text-[20px] sm:text-[32px] lg:text-[56px] text-[#FAAA47] font-bold leading-tight">
            <h4>
              Some scenes stay with you.
              <br />
              So does our popcorn.
            </h4>
          </div>
          <div className="mt-4 text-[14px] sm:text-[20px] lg:text-[32px] text-[#ccc] font-medium max-w-xl ml-auto">
            <p>Pop it, Love it and Repeat... cause every scene</p>
            <p>needs a crunch!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
