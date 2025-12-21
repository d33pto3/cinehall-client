import React from "react";
import Image from "next/image";
import { Movie } from "@/components/homepage/HeroSection";
import { cn } from "@/lib/utils";
import Link from "next/link";

function MovieGridList({
  movies,
  bgColor,
  title = "Showing",
  wrapperClassName,
}: {
  movies: Movie[];
  title: string;
  bgColor?: string;
  wrapperClassName?: string;
}) {
  return (
    <div className={cn(`p-3 sm:p-6 ${bgColor} mx-2 sm:mx-4 rounded-[40px]`, wrapperClassName)}>
      <div className="px-6">
        <div className="flex justify-between items-center text-[#FAAA47]">
          <h4 className="font-medium text-[2.25rem]">{title}</h4>
          <p className="text-base cursor-pointer hover:underline">See all</p>
        </div>
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {movies.map((movie, index) => (
            <Link
              key={movie._id || index}
              href={`/movies/${movie._id}`}
              className="group flex flex-col items-center p-2 sm:p-3 transition-all duration-300 hover:scale-105"
            >
              <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-lg border-2 border-transparent group-hover:border-[#FAAA47]">
                <Image
                  src={movie?.imageUrl}
                  alt={movie?.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
              <div className="mt-3 w-full text-center px-1">
                <p className="text-[#CAC1C1] text-sm sm:text-lg font-semibold truncate group-hover:text-white transition-colors">
                  {movie?.title}
                </p>
                <p className="text-[#CAC1C1] text-xs sm:text-md mt-1 opacity-80">
                  ({new Date(movie?.releaseDate).getFullYear()})
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieGridList;
