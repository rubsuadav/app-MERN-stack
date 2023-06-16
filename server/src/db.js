import mongoose from "mongoose";
import chalk from "chalk";

//local imports
import { MONGO_URL } from "./config.js";
import PostMessage from "./models/post.js";

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
    console.error(
      chalk.red(`Can't connect to the databaseName: ${error.message}`)
    );
  }
};

async function dropCollection() {
  try {
    const collections = await connection.db.listCollections().toArray();
    const nameCollections = collections.map((collection) => collection.name);
    for (const collection of nameCollections) {
      await connection.dropCollection(collection);
      console.log(chalk.blue(`Collection ${collection} dropped`));
    }

  } catch (error) {
    console.error(chalk.red(error.message));
  }
}
async function createCollection() {
  try {
    const collectionName = await PostMessage.collection.collectionName;
    console.log(chalk.blue(`Collection ${collectionName} created`));
  } catch (error) {
    console.error(chalk.red(error.message));
  }
}
