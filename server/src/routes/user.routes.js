import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/:username", getUserProfile);
//crear endpoint que me de mi perfil de usuario TODO
router.patch("/:username", auth, updateUserProfile);

export default router;
