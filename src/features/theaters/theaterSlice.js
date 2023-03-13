import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

// Async thunk action to fetch all theaters
export const fetchTheaters = createAsyncThunk(
  "theaters/fetchTheaters",
  async () => {
    const response = await axios.get("/api/theaters");
    return response.data;
  }
);

//add theaters
export const addTheater = createAsyncThunk(
  "theaters/addTheater",
  async (theaterData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/theaters", theaterData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const theaterSlice = createSlice({
  name: "theaters",
  initialState: {
    theaters: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Update an existing theater in the state
    updateTheater: (state, action) => {
      const index = state.theaters.findIndex(
        (theater) => theater._id === action.payload._id
      );
      if (index !== -1) {
        state.theaters[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTheater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTheater.fulfilled, (state, action) => {
        state.theaters.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addTheater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle pending fetchTheaters request
      .addCase(fetchTheaters.pending, (state) => {
        state.status = "loading";
      })
      // Handle successful fetchTheaters request
      .addCase(fetchTheaters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.theaters = action.payload;
      })
      // Handle failed fetchTheaters request
      .addCase(fetchTheaters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateTheater } = theaterSlice.actions;

export default theaterSlice.reducer;
