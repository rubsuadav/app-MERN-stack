import postMessage from "../models/post.js";
import user from "../models/user.js";

/**
 * Returns all posts or a specific page of posts.
 * @param {String} page - The page number to return.
 * @returns {Array} An array of posts.
 *
 * @example
 * // Request Example:
 * // GET /api/posts?page=2
 * // This request will return the second page of posts.
 */
export const getPosts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 4;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await postMessage.countDocuments({});
    const posts = await postMessage
      .find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        const userId = post.creator;
        const users = await user.findById(userId);
        if (!users) return res.status(404).json({ msg: "User not found" });
        post.creator = users.username;
        return post;
      })
    );

    res.status(200).json({
      data: updatedPosts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

/**
 * Searches for posts based on a search query or tags.
 *
 * @param {String} searchQuery - The search query to match against post titles.
 * @param {String} tags - The tags to match against post tags.
 * @returns {Array} An array of posts that match the search query or tags.
 *
 * @example
 * // Requests Example:
 *
 * // GET /api/posts/search?searchQuery=hello&tags=hello,world
 * // This request will return all posts that have the word "hello" in their title or have the tags "hello" or "world".
 *
 * // GET /api/posts/search?searchQuery=hello
 * // This request will return all posts that have the word "hello" in their title.
 *
 * // GET /api/posts/search?tags=hello,world
 * // This request will return all posts that have the tags "hello" or "world".
 *
 * // GET /api/posts/search
 * // This request will return all posts.
 *
 * // GET /api/posts/search?searchQuery=hello&tags=hello,world&page=2
 * // This request will return the second page of posts that have the word "hello" in their title or have the tags "hello" or "world".
 */
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const titleRegex = new RegExp(searchQuery, "i");
    const posts = await postMessage.find({
      $or: [{ title: titleRegex }, { tags: { $in: tags.split(",") } }],
    });
    res.status(200).json({ data: posts });
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
    newPost.creator = users.username;
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
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
