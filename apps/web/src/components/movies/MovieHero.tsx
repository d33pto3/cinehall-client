"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import HallSelectionModal from "./HallSelectionModal";

interface MovieHeroProps {
  movie: {
    _id: string;
    title: string;
    director: string;
    duration: number; // in minutes
    genre: string;
    releaseDate: string;
    imageUrl: string;
    imdbRating?: string;
    rottenTomatoes?: string;
  };
}

const MovieHero: React.FC<MovieHeroProps> = ({ movie }) => {
  const [isHallModalOpen, setIsHallModalOpen] = useState(false);

  const formatDuration = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs} hr ${mins} min`;
  };

  const year = new Date(movie.releaseDate).getFullYear();

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 px-6 py-12 text-[#CAC1C1]">
        <div className="flex-1 space-y-4">
          <h1 className="text-[3.5rem] font-bold text-red-600 leading-tight">
            {movie.title} ({year})
          </h1>
          <div className="space-y-2 text-xl font-medium">
            <p>
              <span className="text-white">Director :</span> {movie.director}
            </p>
            <p>
              <span className="text-white">Runtime :</span> {formatDuration(movie.duration)}
            </p>
            <p>
              <span className="text-white">Genre :</span> {movie.genre}
            </p>
            <p>
              <span className="text-white">Release Date :</span> {new Date(movie.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            {(movie.imdbRating || true) && (
              <p>
                <span className="text-white">IMDb Rating :</span> {movie.imdbRating || '7.2/10'}
              </p>
            )}
            {(movie.rottenTomatoes || true) && (
              <p>
                <span className="text-white">Rotten Tomatoes :</span> {movie.rottenTomatoes || '83%'}
              </p>
            )}
          </div>
        </div>

        <div className="relative w-[300px] h-[450px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={movie.imageUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 pt-8">
        <Button
          variant="outline"
          className="border-2 border-[#FAAA47] text-[#FAAA47] hover:bg-[#FAAA47] hover:text-white rounded-lg px-8 py-6 text-xl font-bold bg-transparent cursor-pointer"
        >
          Watch Trailer
        </Button>
        <Button 
          onClick={() => setIsHallModalOpen(true)}
          className="bg-[#FAAA47] text-black hover:bg-[#e09a3f] rounded-lg px-12 py-6 text-xl font-bold border-none cursor-pointer"
        >
          Book Ticket
        </Button>
      </div>

      <HallSelectionModal 
        movieId={movie._id} 
        isOpen={isHallModalOpen} 
        onClose={() => setIsHallModalOpen(false)} 
      />
    </div>
  );
};

export default MovieHero;
