import React from "react";
import MovieGridList from "../shared/organisms/MovieGridList";
import { Movie } from "./HeroSection";

function ComingSoon({ movies }: { movies: Movie[] }) {
  return <MovieGridList movies={movies} bgColor="" title={"Coming Soon"} />;
}

export default ComingSoon;
