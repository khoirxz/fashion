import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import initialState, {
  fulfilledHandler,
  loadingHandler,
  rejectedHandler,
} from "./initialState";

export const FetchAllProduct = createAsyncThunk(
  "data/FetchAllProduct",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/products");

      return response.data;
    } catch (error) {
      if (error.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const CreateProduct = createAsyncThunk(
  "data/CreateProduct",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/product", data);

      return response.data;
    } catch (error) {
      if (error.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const DeleteProduct = createAsyncThunk(
  "data/DeleteProduct",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/product/${id}`
      );

      if (response.status === 200) {
        const data = await axios.get("http://localhost:5000/products");

        return data.data;
      }
    } catch (error) {
      if (error.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const productSlice = createSlice({
  name: "productData",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // fetch all product
    builder.addCase(FetchAllProduct.pending, loadingHandler);
    builder.addCase(FetchAllProduct.fulfilled, fulfilledHandler);
    builder.addCase(FetchAllProduct.rejected, rejectedHandler);
    // create product
    builder.addCase(CreateProduct.pending, loadingHandler);
    builder.addCase(CreateProduct.fulfilled, fulfilledHandler);
    builder.addCase(CreateProduct.rejected, rejectedHandler);
    // delete product
    builder.addCase(DeleteProduct.pending, loadingHandler);
    builder.addCase(DeleteProduct.fulfilled, fulfilledHandler);
    builder.addCase(DeleteProduct.rejected, rejectedHandler);
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
