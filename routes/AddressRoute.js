import express from "express";

import { validateCustomer } from "../middlewares/AuthUser.js";
import {
  getAddress,
  createAddess,
  updateAddress,
  getOneAddress,
  deleteAddress,
} from "../controllers/Addresses.js";

const router = express.Router();

router.get("/customer/address", validateCustomer, getAddress);
router.get("/customer/address/one/:id", validateCustomer, getOneAddress);
router.post("/customer/address/add", validateCustomer, createAddess);
router.patch("/customer/address/update/:id", validateCustomer, updateAddress);
router.delete("/customer/address/delete/:id", validateCustomer, deleteAddress);

export default router;
