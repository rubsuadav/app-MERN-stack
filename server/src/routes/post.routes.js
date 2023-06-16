import { Router } from "express";
import {
  getPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;
