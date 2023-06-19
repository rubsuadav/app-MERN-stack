import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import { secret } from "../config.js";
import { validateData, validateUniqueUser } from "../validators/validate.js";

/**
 * @param {String} username
 * @returns {Object} The correspodingser profile
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
