import express from "express";

import { validateCustomer } from "../middlewares/AuthUser.js";
import {
  addCart,
  deleteCart,
  removeCartItem,
  fetchAllItems,
} from "../controllers/CartController.js";

const router = express.Router();

router.get("/customer/cart", validateCustomer, fetchAllItems);
router.post("/customer/cart/add/", validateCustomer, addCart);
// router.patch("/customer/cart/edit/:id", validateCustomer, updateCart);
router.delete("/customer/cart/remove", validateCustomer, removeCartItem);
router.delete("/customer/cart/delete/:id", validateCustomer, deleteCart);

export default router;
