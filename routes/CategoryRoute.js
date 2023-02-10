import express from "express";

import { validateUser } from "../middlewares/AuthUser.js";
import { fetchAllCategory, createCategory } from "../controllers/Category.js";

const router = express.Router();

router.get("/category", validateUser, fetchAllCategory);
router.post("/category", validateUser, createCategory);

export default router;
