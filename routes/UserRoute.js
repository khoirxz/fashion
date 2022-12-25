import express from "express";

import { validateUser, adminOnly } from "../middlewares/AuthUser.js";
import {
  fetchAllUser,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";

const router = express.Router();

router.get("/users", validateUser, fetchAllUser);
router.get("/user/:id", validateUser, fetchUser);
router.post("/user", validateUser, adminOnly, createUser);
router.patch("/user/:id", validateUser, adminOnly, updateUser);
router.delete("/user/:id", validateUser, adminOnly, deleteUser);

export default router;
