import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import { secret } from "../config.js";
import { validateData, validateUniqueUser } from "../validators/validate.js";

/**
 * @returns {Object} The username of the logged in user
 */
export const getUserNameByLoggedInUser = async (req, res) => {
  const userId = req.userId;
  try {
    const userById = await user.findById(userId);
    if (!userById)
      return res.status(404).json({ message: "User doesn't exist" });

    res.status(200).json({ username: userById.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @param {String} username
 * @returns {Object} The correspoding user profile
 */
export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const userByUsername = await user.find({ username });
    const users = userByUsername.map((user) => user.username);
    if (users.length === 0)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      name: userByUsername[0].name,
      username: userByUsername[0].username,
      email: userByUsername[0].email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @param {String} username
 * @returns {Object} Your personal profile
 */
export const getPersonalProfile = async (req, res) => {
  const userId = req.userId;
  const { username } = req.params;
  try {
    const userByUsername = await user.find({ username });
    const users = userByUsername.map((user) => user._id);
    if (userId !== users[0].toString()) {
      return res
        .status(401)
        .json({ message: "You can't see one user profile if not yourself!" });
    }
    res.status(200).json({
      name: userByUsername[0].name,
      username: userByUsername[0].username,
      email: userByUsername[0].email,
      profilePicture: userByUsername[0].profilePicture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { username } = req.params;
  const { firstName, lastName, email, password } = req.body;

  const userId = req.userId;
  const userByUsername = await user.find({ username });
  const users = userByUsername.map((user) => user._id);
  if (userId !== users[0].toString()) {
    return res
      .status(401)
      .json({ message: "You can't upgrade one user profile if not yourself!" });
  }
  try {
    let token = req.headers.authorization.split(" ")[1];
    let updateData = { firstName, lastName, username, email };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      updateData.password = hashedPassword;
      token = jwt.sign(
        { email: result.email, username: result.username, id: result._id },
        secret
      );
    }
    const result = await user.findOneAndUpdate({ username }, updateData, {
      new: true,
    });

    res.status(201).json({
      username: result.username,
      email: result.email,
      name: result.name,
      token,
    });
  } catch (error) {
    res.status(409).json({ message: "Invalid data" });
  }
};
