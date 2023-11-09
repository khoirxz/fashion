import express from "express";

import { validateUser } from "../middlewares/AuthUser.js";
import {
  fetchAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  fetchCategory,
} from "../controllers/Category.js";

const router = express.Router();

router.get("/category", validateUser, fetchAllCategory);
router.get("/category/:id", validateUser, fetchCategory);
router.post("/category", validateUser, createCategory);
router.patch("/category/:id", validateUser, updateCategory);
router.delete("/category/:id", validateUser, deleteCategory);

export default router;
