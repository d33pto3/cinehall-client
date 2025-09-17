"use client";

import React, { useEffect, useState } from "react";
import MovieCarousel from "./MovieCarousel";
import axiosInstance from "@/lib/axios";

interface HeroSectionProps {
  empty?: true;
}

interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
  duration: number;
  genre: string;
  releaseDate: string;
  director: string;
}

const HeroSection = ({}: HeroSectionProps) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axiosInstance.get("/movie");
      const movies = res.data.data;

      console.log(movies);

      setImageUrls(movies.map((movie: Movie) => movie.imageUrl));
    };

    fetchMovies();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Content */}
      <MovieCarousel slides={imageUrls} />
    </section>
  );
};

export default HeroSection;
