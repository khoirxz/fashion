import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productSlice from "../features/productSlice";
import userSLice from "../features/usersSlice";
import publicSlice from "../features/publicSlice";
import categorySlice from "../features/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productSlice,
    category: categorySlice,
    users: userSLice,
    public: publicSlice,
  },
});
