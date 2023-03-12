import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserAsync, getUsersAsync } from "./userAPI";

const initialState = {
  isLoading: false,
  user: {},
  isError: false,
  error: "",
};

export const addUser = createAsyncThunk("user/addUser", async (user) => {
  const response = await addUserAsync(user);
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const response = await getUsersAsync();
  return response.data;
});

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    anynthing: () => {},
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const { name, role, email } = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        console.log(localStorage.getItem("user"));
        state.user = {
          name,
          role,
          email,
        };
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.blog = {};
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

// export const {} = counterSlice.actions;
export default counterSlice.reducer;
