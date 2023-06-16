import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";
import chalk from "chalk";

const connection = mongoose.connection;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL).then(() => {
      console.log(
        chalk.rgb(
          255,
          200,
          255
        )(`MongoDB connected to ${connection.db.databaseName}`)
      );
    });
    dropCollection();
    createCollection();
  } catch (error) {
    console.error(chalk.red(error));
  }
};

async function dropCollection() {
  try {
    await connection.dropCollection("users").then(() => {
      console.log(chalk.red(`Collection users dropped`));
    });
  } catch (error) {
    console.error(chalk.red(error));
  }
}
async function createCollection() {
  try {
    await connection.createCollection("users").then(() => {
      console.log(chalk.blue(`Collection users created`));
    });
  } catch (error) {
    console.error(chalk.red(error));
  }
}
