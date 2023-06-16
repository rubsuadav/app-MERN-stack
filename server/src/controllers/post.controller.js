import postMessage from "../models/post.js";

export const getPosts = async (_req, res) => {
  try {
    const postMessages = await postMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new postMessage(post);
  try {
    await newPost.save();
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
    const updatedPost = await postMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.json(updatedPost);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
