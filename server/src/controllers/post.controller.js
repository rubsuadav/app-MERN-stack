import postMessage from "../models/post.js";
import user from "../models/user.js";

export const getPosts = async (_req, res) => {
  try {
    const postMessages = await postMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postMessage.findById(id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();
    const users = await user.findById(req.userId);
    if (!users) return res.status(404).json({ msg: "User not found" });
    const username = users.username;
    newPost.creator = username;
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, tags, selectedFile } = req.body;
  try {
    const updatedPost = await postMessage.findByIdAndUpdate(
      id,
      { title, message, creator, tags, selectedFile, _id: id },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await postMessage.findByIdAndRemove(id);
    res.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postMessage.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPost = await postMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
