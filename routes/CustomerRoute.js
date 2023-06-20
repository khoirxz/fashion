import express from "express";

import {
  fetchAllCustomer,
  fetchCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/CustomerController.js";

const router = express.Router();

router.get("/customer", fetchAllCustomer);
router.get("/customer/:id", fetchCustomer);
router.post("/customer", createCustomer);
router.patch("/customer/:id", updateCustomer);
router.delete("/customer/:id", deleteCustomer);

export default router;
