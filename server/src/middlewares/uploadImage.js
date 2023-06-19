import multer from "multer";
import user from "../models/user.js";

// Configurar el almacenamiento de multer
const storage = multer.memoryStorage();

// Configurar el middleware de multer
export const upload = multer({ storage });

export const uploadImage = async (req, res) => {
  const image = req.file;
  const userId = req.userId;
  const { username } = req.params;

  if (!image) {
    return res.status(400).json({ message: "No image provided" });
  }
  try {
    const userByUsername = await user.find({ username });
    const users = userByUsername.map((user) => user._id);
    if (userId !== users[0].toString()) {
      return res.status(401).json({
        message: "You can't upgrade one user profile if not yourself!",
      });
    }
    userByUsername[0].profilePicture = image.buffer;
    await userByUsername[0].save();
    res
      .status(200)
      .json({ message: "Profile picture updated", image: image.buffer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const errorHandler = (err, _req, res, next) => {
  if (err instanceof multer.MulterError)
    return res.status(400).json({ message: "Unexpected field in the request" });
  next();
};
