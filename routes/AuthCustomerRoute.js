import express from "express";

import {
  LoginCustomer,
  LogoutCustomer,
  VerifyCustomer,
} from "../controllers/AuthCustomer.js";

const router = express.Router();

router.post("/customer/auth/login", LoginCustomer);
router.get("/customer/auth/verify", VerifyCustomer);
router.delete("/customer/auth/logout", LogoutCustomer);

export default router;
