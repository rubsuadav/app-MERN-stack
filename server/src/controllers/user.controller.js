import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/user.js";
import { secret } from "../config.js";
import { validateData, validateUniqueUser } from "../validators/validate.js";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await user.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: oldUser.email, username: oldUser.username, id: oldUser._id },
      secret
    );
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signUp = async (req, res) => {
  const { username, email, password, firstName, lastName } = req.body;
  const validationUnique = await validateUniqueUser({ email, username });
  const validationData = validateData({
    username,
    email,
    password,
    firstName,
    lastName,
  });

  if (validationUnique.length > 0) {
    return res.status(409).json({ message: validationUnique });
  }
  if (validationData.length > 0) {
    return res.status(409).json({ message: validationData });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await user.create({
      email,
      password: hashedPassword,
      username,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      { email: result.email, username: result.username, id: result._id },
      secret
    );

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
