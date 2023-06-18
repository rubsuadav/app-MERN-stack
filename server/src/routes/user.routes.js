import { Router } from "express";
import {
  signUp,
  signIn,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/users/:username", getUserProfile);
//crear endpoint que me de mi perfil de usuario TODO
router.patch("/users/:username", auth, updateUserProfile);
router.post("/signup", signUp);
router.post("/signin", signIn);

export default router;
