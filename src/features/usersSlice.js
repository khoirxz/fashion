import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import initialState, {
  fulfilledHandler,
  loadingHandler,
  rejectedHandler,
} from "./initialState";

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
    // get all user
    builder.addCase(FetchAllUser.pending, loadingHandler);
    builder.addCase(FetchAllUser.fulfilled, fulfilledHandler);
    builder.addCase(FetchAllUser.rejected, rejectedHandler);
    // create user
    builder.addCase(CreateUser.pending, loadingHandler);
    builder.addCase(CreateUser.fulfilled, fulfilledHandler);
    builder.addCase(CreateUser.rejected, rejectedHandler);
    // delete user
    builder.addCase(DeleteUser.pending, loadingHandler);
    builder.addCase(DeleteUser.fulfilled, fulfilledHandler);
    builder.addCase(DeleteUser.rejected, rejectedHandler);
  },
});

export const { reset } = userSLice.actions;
export default userSLice.reducer;
