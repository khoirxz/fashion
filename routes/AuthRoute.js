import express from "express";

import { Login, Logout, Verify } from "../controllers/Auth.js";

const router = express.Router();

router.get("/verify", Verify);
router.post("/login", Login);
router.delete("/logout", Logout);

export default router;
