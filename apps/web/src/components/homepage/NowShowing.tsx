import React from "react";
import MovieGridList from "../shared/organisms/MovieGridList";
import { Movie } from "./HeroSection";

function NowShowing({ movies }: { movies: Movie[] }) {
  return (
    <MovieGridList
      movies={movies}
      bgColor="bg-[#322F2F91]"
      title={"Now Showing"}
      wrapperClassName="mt-12"
    />
  );
}

export default NowShowing;
