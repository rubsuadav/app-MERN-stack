import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";
import chalk from "chalk";

const connection = mongoose.connection;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(
      chalk.rgb(
        255,
        200,
        255
      )(`MongoDB connected to ${connection.db.databaseName}`)
    );
    await dropCollection();
    await createCollection();
  } catch (error) {
    console.error(chalk.red(`Can't connect to the databaseName: ${error.message}`));
  }
};

async function dropCollection() {
  try {
    await connection.dropCollection("users");
    console.log(chalk.red(`Collection users dropped`));
  } catch (error) {
    console.error(chalk.red(error.message));
  }
}
async function createCollection() {
  try {
    await connection.createCollection("users");
    console.log(chalk.blue(`Collection users created`));
  } catch (error) {
    console.error(chalk.red(error.message));
  }
}
