"use client";

import React, { useEffect, useState } from "react";
import MovieHero from "@/components/movies/MovieHero";
import FeaturingNews from "@/components/movies/FeaturingNews";
import MoreInfo from "@/components/movies/MoreInfo";
import CastAndCrew from "@/components/movies/CastAndCrew";
import ComingSoon from "@/components/homepage/ComingSoon";
import { Movie } from "@/components/homepage/HeroSection";

import { useParams } from "next/navigation";
import { MovieGridSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function MoviesPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [comingSoonMovies, setComingSoonMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
        
        // Fetch current movie
        const movieRes = await fetch(`${url}/movie/${id}`);
        if (movieRes.ok) {
          const movieData = await movieRes.json();
          setMovie(movieData.movie);
        }

        // Fetch coming soon movies
        const comingSoonRes = await fetch(`${url}/movie`);
        if (comingSoonRes.ok) {
          const comingSoonData = await comingSoonRes.json();
          setComingSoonMovies(comingSoonData.data);
        }
      } catch (error) {
        console.error("Failed to fetch movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieData();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto pb-20 px-4">
        {/* Hero Skeleton */}
        <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden mt-8">
          <Skeleton className="w-full h-full" />
          <div className="absolute bottom-0 left-0 p-8 space-y-4 w-full bg-gradient-to-t from-black/80 to-transparent">
             <Skeleton className="h-12 w-1/2" />
             <Skeleton className="h-6 w-1/4" />
             <div className="flex gap-4">
                <Skeleton className="h-12 w-32 rounded-full" />
                <Skeleton className="h-12 w-32 rounded-full" />
             </div>
          </div>
        </div>
        <div className="mt-12 space-y-6">
           <Skeleton className="h-8 w-48" />
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Skeleton className="h-64 rounded-2xl md:col-span-2" />
              <Skeleton className="h-64 rounded-2xl" />
           </div>
        </div>
        <MovieGridSkeleton title="More to Explore" />
      </main>
    );
  }

  if (!movie) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 text-2xl">Movie not found</div>;
  }

  const movieDescription = "Warner Bros. Pictures is bringing Superman, the first feature film from DC Studios, to theaters worldwide this summer. Directed by James Gunn, the film reintroduces the legendary hero to audiences with a bold new vision for the DC Universe. Blending epic spectacle, sharp humor, and heartfelt storytelling, Gunn presents a Superman defined by compassion and an unwavering belief in the inherent goodness of humanity.";

  return (
    <main className="max-w-7xl mx-auto pb-20">
      <MovieHero movie={movie} />
      <FeaturingNews />
      <MoreInfo content={movieDescription} />
      <CastAndCrew />
      <div className="mt-12">
        <ComingSoon movies={comingSoonMovies} />
      </div>
    </main>
  );
}
