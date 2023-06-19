import { Router } from "express";
import {
  getUserProfile,
  getPersonalProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/auth.js";
import {
  errorHandler,
  upload,
  uploadImage,
} from "../middlewares/uploadImage.js";

const router = Router();

router.get("/:username", getUserProfile);
router.get("/profile/:username", auth, getPersonalProfile);

router.patch("/:username", auth, updateUserProfile);
router.post(
  "/:username/uploadImage",
  auth,
  upload.single("profilePicture"),
  uploadImage,
  errorHandler
);

export default router;
