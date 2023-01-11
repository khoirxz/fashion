import express from "express";

import { getAllProducts } from "../controllers/PublicController.js";

const router = express.Router();

router.get("/public/products", getAllProducts);

export default router;
