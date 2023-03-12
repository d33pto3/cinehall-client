import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const NowPlaying = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto movie-slider">
      <h1 className="text-center m-5 font-semibold text-3xl">NOW PLAYING</h1>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <div className="top-movie-slide">
              <img
                className="w-full h-full object-cover rounded-lg shadow-md"
                src={movie.image}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NowPlaying;
