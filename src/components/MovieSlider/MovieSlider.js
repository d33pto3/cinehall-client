import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../features/movie/movieSlice";
import PlayButton from "../ui/PlayButton";

function MovieSlider() {
  const { movies, status, error } = useSelector((state) => state.movies);
  console.log(movies);
  const dispatch = useDispatch();

  // const movies = [
  //   {
  //     id: 1,
  //     title: "The Matrix",
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1673688152102-b24caa6e8725?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
  //   },
  //   {
  //     id: 2,
  //     title: "Inception",
  //     image:
  //       "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  //   },
  //   {
  //     id: 3,
  //     title: "Blade Runner 2049",
  //     image:
  //       "https://images.unsplash.com/photo-1599689018459-fcf807a9eceb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  //   },
  //   {
  //     id: 4,
  //     title: "Star Wars: Episode IV - A New Hope",
  //     image:
  //       "https://images.unsplash.com/photo-1586861203927-800a5acdcc4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
  //   },
  //   {
  //     id: 5,
  //     title: "Jurassic Park",
  //     image: "https://via.placeholder.com/300x450",
  //   },
  //   {
  //     id: 6,
  //     title: "The Godfather",
  //     image: "https://via.placeholder.com/300x450",
  //   },
  // ];

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

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
      // console.log(`Current slide: ${current}, Next slide: ${next}`);
    },
  };

  return (
    <div className="w-full">
      <Slider className="slick-slider mx-auto" {...settings}>
        {movies.map((movie) => (
          <div key={movie._id}>
            <div className="slider-image-container relative">
              <div className="floating-div absolute top-20 mb-4 mr-4 z-10">
                {/* snap caption filter */}
                <div className="relative right-2 w-screen">
                  <div className="text">
                    <div className="bg-black bg-opacity-50 p-5 flex">
                      <div className="relative bottom-2">
                        <PlayButton />
                      </div>
                      <div className="ml-5 mr-20">
                        <p className="text-white text-4xl uppercase font-bold">
                          {movie.title}
                        </p>
                        <p className="text-white text-l uppercase font-medium">
                          {movie.director}
                        </p>
                      </div>
                      <div></div>
                      <div className="text-white">
                        <p>
                          Duration: <i>{movie.duration}</i> minutes
                        </p>
                        <p>
                          Genre: <i>{movie.genre}</i>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="slider-image">
                <img
                  className="w-full max-h-500 opacity-90 "
                  src={movie.imageUrl}
                  alt={movie.title}
                  onClick={() => handleMovieClick(movie.id)}
                />
              </div>
              <button className="glow-button bg-slate-500 font-bold py-4 px-6 rounded shadow-md hover:shadow-lg focus:outline-none focus:shadow-lg transition-all duration-300 absolute bottom-20 left-20 mb-4 mr-4 z-10">
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
