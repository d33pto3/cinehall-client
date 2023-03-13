import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import movieReducer from "../features/movie/movieSlice";
import bookingsReducer from "../features/bookings/bookingsSlice";
import theaterReducer from "../features/theaters/theaterSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: movieReducer,
    bookings: bookingsReducer,
    theaters: theaterReducer,
  },
});
