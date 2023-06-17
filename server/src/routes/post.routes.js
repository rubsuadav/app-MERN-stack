import { Router } from "express";
import {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
} from "../controllers/post.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/search", getPostsBySearch);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
