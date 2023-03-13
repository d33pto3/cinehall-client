import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

// fetch all movies
export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await axios.get("/api/movies");
  return response.data;
});

// add movies to the database
export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (movieData) => {
    console.log(movieData);
    try {
      const response = await axios.post("/api/movies", movieData);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // your other reducers here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
