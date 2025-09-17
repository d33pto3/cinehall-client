import React from "react";
import MovieGridList from "../shared/organisms/MovieGridList";
import { Movie } from "./HeroSection";

function NowShowing({ movies }: { movies: Movie[] }) {
  return <MovieGridList movies={movies} />;
}

export default NowShowing;
