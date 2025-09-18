import React from "react";
import Image from "next/image";
import { Movie } from "@/components/homepage/HeroSection";
import { cn } from "@/lib/utils";

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
    <div className={cn(`p-6 ${bgColor} mx-4 rounded-[40px]`, wrapperClassName)}>
      <div className="px-6">
        <div className="flex justify-between items-center text-[#FAAA47]">
          <h4 className="font-medium text-[2.25rem]">{title}</h4>
          <p className="text-base cursor-pointer hover:underline">See all</p>
        </div>
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 transition-transform hover:scale-105"
              style={{ minWidth: 201, maxWidth: 201, minHeight: 360 }}
            >
              <div className="flex justify-between w-[201px] lg:w-[250px] h-[296px] lg:h-[396px] relative">
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
