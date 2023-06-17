import { Router } from "express";
import {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
  commentPost,
  getPostsByCreator,
} from "../controllers/post.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

router.get("/search", getPostsBySearch);
router.get("/creator", getPostsByCreator);
router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", commentPost);

export default router;
