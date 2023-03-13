import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state of the bookings slice
const initialState = {
  booking: null,
  status: "idle",
  error: null,
};

// Async action creator to fetch a single booking by ID
export const fetchBookingById = createAsyncThunk(
  "bookings/fetchBookingById",
  async (id) => {
    const response = await axios.get(`/bookings/${id}`);
    return response.data;
  }
);

// Define the bookings slice
const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetchBookingById.pending action
    builder.addCase(fetchBookingById.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    // Handle fetchBookingById.fulfilled action
    builder.addCase(fetchBookingById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.booking = action.payload;
    });

    // Handle fetchBookingById.rejected action
    builder.addCase(fetchBookingById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default bookingsSlice.reducer;
