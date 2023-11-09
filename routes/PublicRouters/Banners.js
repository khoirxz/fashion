import express from "express";

import {
  fetchAllBanner,
  fetchBanner,
} from "../../controllers/PublicControllers/Banners.js";

const router = express.Router();

router.get("/banners", fetchAllBanner);
router.get("/banner/:link", fetchBanner);

export default router;
