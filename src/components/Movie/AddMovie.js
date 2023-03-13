import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "../../features/movie/movieSlice";

const AddMoviePage = () => {
  const [formData, setFormData] = useState({
    title: "",
    releaseDate: "",
    director: "",
    duration: "",
    genre: "",
    imageUrl: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMovie(formData));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto bg-white rounded-md shadow-md overflow-hidden">
        <div className="flex items-center justify-center bg-gray-800 text-white h-12">
          <h1 className="text-xl font-bold">Add New Movie</h1>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="releaseDate">
                Release Date
              </label>
              <input
                type="date"
                name="releaseDate"
                id="releaseDate"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={formData.releaseDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="director">
                Director
              </label>
              <input
                type="text"
                name="director"
                id="director"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={formData.director}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="duration">
                Duration in minutes
              </label>
              <input
                type="text"
                name="duration"
                id="duration"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="duration">
                Genre
              </label>
              <input
                type="text"
                name="genre"
                id="genre"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={formData.genre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2" htmlFor="duration">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:shadow-outline-blue"
              >
                Add Movie
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMoviePage;
