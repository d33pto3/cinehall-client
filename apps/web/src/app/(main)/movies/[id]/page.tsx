"use client";

import React, { useEffect, useState } from "react";
import MovieHero from "@/components/movies/MovieHero";
import FeaturingNews from "@/components/movies/FeaturingNews";
import MoreInfo from "@/components/movies/MoreInfo";
import CastAndCrew from "@/components/movies/CastAndCrew";
import ComingSoon from "@/components/homepage/ComingSoon";
import { Movie } from "@/components/homepage/HeroSection";

import { useParams } from "next/navigation";

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
    return <div className="min-h-screen flex items-center justify-center text-[#FAAA47] text-2xl">Loading...</div>;
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
