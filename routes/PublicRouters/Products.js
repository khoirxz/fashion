import express from "express";

import {
  getAllProducts,
  getOneProduct,
  searchProduct,
  sortByCategory,
} from "../../controllers/PublicControllers/Products.js";

const router = express.Router();

// products
router.get("/public/products", getAllProducts);
router.get("/public/products/:slug", getOneProduct);
router.get("/public/products/search/:title", searchProduct);
router.get("/public/products/sort/:category", sortByCategory);

export default router;
