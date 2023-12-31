import { Router } from "express";
import {
  getUserNameByLoggedInUser,
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

router.get("/", auth, getUserNameByLoggedInUser);
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
