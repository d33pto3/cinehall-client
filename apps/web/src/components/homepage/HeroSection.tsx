"use client";

import React, { useEffect, useState } from "react";
import MovieCarousel from "./MovieCarousel";
import axiosInstance from "@/lib/axios";
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
      const res = await axiosInstance.get("/movie");
      const moviesList = res.data.data;

      setMovies(moviesList);
      setImageUrls(moviesList.map((movie: Movie) => movie.imageUrl));
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
