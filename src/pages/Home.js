import React from "react";
import { useSelector } from "react-redux";
import MovieSlider from "../components/MovieSlider/MovieSlider";
import NowPlaying from "../components/MovieSlider/NowPlaying";
import TopMovieSlider from "../components/MovieSlider/TopMovie/TopMovieSlider";

export default function Home() {
  const user = useSelector((state) => state.user);

  // console.log(user);

  return (
    <>
      <MovieSlider />
      <TopMovieSlider />
      <NowPlaying />
    </>
  );
}
