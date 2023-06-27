import express from "express";
import { validateUser } from "../middlewares/AuthUser.js";
import {
  fetchAllCustomer,
  fetchCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/CustomerController.js";

const router = express.Router();

router.get("/customer", validateUser, fetchAllCustomer);
router.get("/customer/:id", fetchCustomer);
router.post("/customer", createCustomer);
router.patch("/customer/:id", validateUser, updateCustomer);
router.delete("/customer/:id", validateUser, deleteCustomer);

export default router;
