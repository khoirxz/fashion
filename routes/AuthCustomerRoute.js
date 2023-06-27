import express from "express";

import { LoginCustomer, VerifyCustomer } from "../controllers/AuthCustomer.js";

const router = express.Router();

router.post("/customer/auth/login", LoginCustomer);
router.get("/customer/auth/verify", VerifyCustomer);

export default router;
