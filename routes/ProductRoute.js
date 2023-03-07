import express from "express";

import { validateUser } from "../middlewares/AuthUser.js";
import {
  validateProduct,
  validateThumbnail,
} from "../middlewares/productCheck.js";
import {
  fetchAllProduct,
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Products.js";

const router = express.Router();

router.get("/products", validateUser, fetchAllProduct);
router.get("/product/:id", validateUser, fetchProduct);
router.post(
  "/product",
  validateUser,
  validateProduct,
  validateThumbnail,
  createProduct
);
router.patch("/product/:id", validateUser, validateProduct, updateProduct);
router.delete("/product/:id", validateUser, deleteProduct);

export default router;
