import React from "react";
import Image from "next/image";
import { Movie } from "@/components/homepage/HeroSection";

function MovieGridList({ movies }: { movies: Movie[] }) {
  return (
    <div className="p-6 my-24 bg-[#322F2F91] mx-4 rounded-[40px]">
      <div className="px-6">
        <div className="flex justify-between items-center text-[#FAAA47]">
          <h4 className="font-medium text-[2.25rem]">Now Showing</h4>
          <p className="text-base cursor-pointer hover:underline">See all</p>
        </div>
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 transition-transform hover:scale-105"
              style={{ minWidth: 201, maxWidth: 201, minHeight: 360 }}
            >
              <div className="w-[201px] h-[296px] relative">
                <Image
                  src={movie?.imageUrl}
                  alt={movie?.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="201px"
                  //   priority={index < 5}
                />
              </div>
              <div className="mt-3 w-full text-center">
                <p className="text-[#CAC1C1] text-lg font-semibold truncate">
                  {movie?.title}
                </p>
                <p className="text-[#CAC1C1] text-md mt-1">
                  ({new Date(movie?.releaseDate).getFullYear()})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieGridList;