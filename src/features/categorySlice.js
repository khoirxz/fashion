import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import initialState, {
  fulfilledHandler,
  loadingHandler,
  rejectedHandler,
} from "./initialState";

export const FetchAllCategories = createAsyncThunk(
  "data/FetchAllCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/category");

      return response.data;
    } catch (error) {
      if (error.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const CreateCategory = createAsyncThunk(
  "data/CreateCategory",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/category", {
        category: data.category,
      });

      return response.data;
    } catch (error) {
      if (error.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const UpdateCategory = createAsyncThunk(
  "data/UpdateCategory",
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/category/${data.id}`,
        {
          title: data.category,
        }
      );

      return response.data;
    } catch (error) {
      if (error.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const categorySlice = createSlice({
  name: "categoryData",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(FetchAllCategories.pending, loadingHandler);
    builder.addCase(FetchAllCategories.fulfilled, fulfilledHandler);
    builder.addCase(FetchAllCategories.rejected, rejectedHandler);
    // create category
    builder.addCase(CreateCategory.pending, loadingHandler);
    builder.addCase(CreateCategory.fulfilled, fulfilledHandler);
    builder.addCase(CreateCategory.rejected, rejectedHandler);
    // update category
    builder.addCase(UpdateCategory.pending, loadingHandler);
    builder.addCase(UpdateCategory.fulfilled, fulfilledHandler);
    builder.addCase(UpdateCategory.rejected, rejectedHandler);
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
