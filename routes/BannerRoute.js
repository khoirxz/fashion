import express from "express";

import { validateUser } from "../middlewares/AuthUser.js";
import {
  createBanner,
  updateBanner,
  fetchAllBanner,
  fetchBanner,
} from "../controllers/BannerController.js";

const router = express.Router();

router.get("/banners", fetchAllBanner);
router.get("/banner/:link", fetchBanner);
router.post("/banner", validateUser, createBanner);
router.patch("/banner/:id", validateUser, updateBanner);

export default router;
