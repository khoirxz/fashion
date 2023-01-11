import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const FetchAllUser = createAsyncThunk(
  "user/FetchAllUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/users");

      return response.data;
    } catch (error) {
      if (error.message) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const CreateUser = createAsyncThunk(
  "user/CreateUser",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:5000/user", {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.password,
        role: data.role,
        createdAt: new Date().toISOString(),
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

export const DeleteUser = createAsyncThunk(
  "user/DeleteUser",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:5000/user/${id}`);

      if (response.status === 201) {
        const data = await axios.get("http://localhost:5000/users");

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

export const userSLice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(FetchAllUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(FetchAllUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(FetchAllUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    // create user
    builder.addCase(CreateUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(CreateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = { status: 200, message: "created", data: action.payload };
    });
    builder.addCase(CreateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    // delete user
    builder.addCase(DeleteUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(DeleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(DeleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = userSLice.actions;
export default userSLice.reducer;
