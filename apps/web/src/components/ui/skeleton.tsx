"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Skeleton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[#2D2D2D]/50 rounded-lg",
        className
      )}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export const MovieCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center p-2 sm:p-3 w-full">
      <Skeleton className="w-full aspect-[2/3] rounded-2xl" />
      <div className="mt-3 w-full space-y-2">
        <Skeleton className="h-6 w-3/4 mx-auto" />
        <Skeleton className="h-4 w-1/2 mx-auto" />
      </div>
    </div>
  );
};

export const MovieGridSkeleton = ({ title, count = 5 }: { title?: string, count?: number }) => {
  return (
    <div className="p-3 sm:p-6 bg-[#322F2F91] mx-2 sm:mx-4 rounded-[40px] mt-12">
      <div className="px-6">
        <div className="flex justify-between items-center text-[#FAAA47]">
          {title ? (
            <h4 className="font-medium text-[2.25rem]">{title}</h4>
          ) : (
            <Skeleton className="h-10 w-48" />
          )}
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {[...Array(count)].map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const CarouselSkeleton = () => {
  return (
    <div className="relative w-full h-[400px] lg:h-[600px] bg-[#1A1A1A]">
      <Skeleton className="w-full h-full rounded-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
};
