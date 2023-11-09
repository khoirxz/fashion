import express from "express";
import { fetchAllCategory, fetchCategory } from "../../controllers/Category.js";

const router = express.Router();

router.get("/public/category", fetchAllCategory);
router.get("/public/category/:category", fetchCategory);

export default router;
