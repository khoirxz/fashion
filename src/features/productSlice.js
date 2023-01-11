import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

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
      const response = await axios.post("http://localhost:5000/product", {
        title: data.title,
        thumbnail: data.thumbnail,
        price: data.price,
        description: data.description,
        createdAt: data.createdAt,
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
    builder.addCase(FetchAllProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(FetchAllProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(FetchAllProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    // create product
    builder.addCase(CreateProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CreateProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = { status: 200, message: "created" };
    });
    builder.addCase(CreateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    // delete product
    builder.addCase(DeleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(DeleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
