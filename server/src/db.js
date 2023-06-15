import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";
import chalk from "chalk";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    console.error(error);
  }
};

mongoose.connection.on("connected", () => {
  console.log(
    chalk.rgb(
      255,
      200,
      255
    )(`MongoDB connected to ${mongoose.connection.db.databaseName}`)
  );
});
