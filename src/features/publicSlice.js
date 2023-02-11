import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import initialState, {
  fulfilledHandler,
  loadingHandler,
  rejectedHandler,
} from "./initialState";

export const FetchAllProductPublic = createAsyncThunk(
  "public/FetchAllProductPublic",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/public/products");

      return response.data;
    } catch (error) {
      if (error.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    //public
    builder.addCase(FetchAllProductPublic.pending, loadingHandler);
    builder.addCase(FetchAllProductPublic.fulfilled, fulfilledHandler);
    builder.addCase(FetchAllProductPublic.rejected, rejectedHandler);
  },
});

export const { reset } = publicSlice.actions;
export default publicSlice.reducer;
