"use client";

import React, { useEffect, useState } from "react";
import MovieCarousel from "./MovieCarousel";

import NowShowing from "./NowShowing";
import ComingSoon from "./ComingSoon";

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
    </section>
  );
};

export default HeroSection;
