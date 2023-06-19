import { Router } from "express";
import {
  getUserProfile,
  getPersonalProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/:username", getUserProfile);
router.get("/profile/:username", auth, getPersonalProfile);

router.patch("/:username", auth, updateUserProfile);

export default router;
