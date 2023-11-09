import express from "express";

import { validateUser } from "../middlewares/AuthUser.js";
import {
  createBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/BannerController.js";

const router = express.Router();

router.post("/banner", validateUser, createBanner);
router.patch("/banner/:id", validateUser, updateBanner);
router.delete("/banner/:id", validateUser, deleteBanner);

export default router;
