import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MovieSlider() {
  const movies = [
    {
      id: 1,
      title: "The Matrix",
      image:
        "https://plus.unsplash.com/premium_photo-1673688152102-b24caa6e8725?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    },
    {
      id: 2,
      title: "Inception",
      image:
        "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "Blade Runner 2049",
      image:
        "https://images.unsplash.com/photo-1599689018459-fcf807a9eceb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 4,
      title: "Star Wars: Episode IV - A New Hope",
      image:
        "https://images.unsplash.com/photo-1586861203927-800a5acdcc4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
    },
    {
      id: 5,
      title: "Jurassic Park",
      image: "https://via.placeholder.com/300x450",
    },
    {
      id: 6,
      title: "The Godfather",
      image: "https://via.placeholder.com/300x450",
    },
  ];

  const handleMovieClick = (movieId) => {
    console.log(`Clicked on movie with ID ${movieId}`);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      console.log(`Current slide: ${current}, Next slide: ${next}`);
    },
  };

  return (
    <div className="w-full">
      <Slider className="slick-slider mx-auto" {...settings}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <div className="slider-image-container relative">
              <div className="floating-div absolute top-20 left-20 mb-4 mr-4 z-10">
                <span className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-indigo-500 play-button"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                    />
                  </svg>
                  <h1 className="movie-title-slider font-semibold">
                    {movie.title}
                  </h1>
                </span>
              </div>
              <div className="slider-image">
                <img
                  className="w-full max-h-500 opacity-90 "
                  src={movie.image}
                  alt={movie.title}
                  onClick={() => handleMovieClick(movie.id)}
                />
              </div>
              <button class="glow-button bg-slate-500 font-bold py-4 px-6 rounded shadow-md hover:shadow-lg focus:outline-none focus:shadow-lg transition-all duration-300 absolute bottom-20 left-20 mb-4 mr-4 z-10">
                BOOK NOW
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MovieSlider;
