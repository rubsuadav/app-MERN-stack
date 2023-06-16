import mongoose from "mongoose";
import chalk from "chalk";
//local imports
import { MONGO_URL } from "./config.js";
import PostMessage from "./models/post.js";

const connection = mongoose.connection;
const collectionName = await PostMessage.collection.collectionName;

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
    await clearCollection();
    await createCollection();
  } catch (error) {
    console.error(
      chalk.red(`Can't connect to the databaseName: ${error.message}`)
    );
  }
};

async function clearCollection() {
  try {
    await PostMessage.deleteMany({});
    console.log(chalk.yellow(`Collection ${collectionName} cleared`));
  } catch (error) {
    console.error(chalk.red(`Error clearing collection: ${error.message}`));
  }
}

async function createCollection() {
  try {
    console.log(chalk.blue(`Collection ${collectionName} created`));
  } catch (error) {
    console.error(chalk.red(error.message));
  }
}
