import mongoose from "mongoose";
import chalk from "chalk";
//local imports
import { MONGO_URL } from "./config.js";
import user from "./models/user.js";
import post from "./models/post.js";

const connection = mongoose.connection;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(
      chalk.rgb(
        255,
        200,
        255
      )(`MongoDB connected to the database ${connection.db.databaseName}`)
    );
    await recreateDatabase();
  } catch (error) {
    console.error(
      chalk.red(`Can't connect to the databaseName: ${error.message}`)
    );
  }
};

async function recreateDatabase() {
  try {
    await connection.dropDatabase();
    console.log(
      chalk.rgb(0, 0, 255)(`Database ${connection.db.databaseName} dropped`)
    );
    await createModels();
    console.log(chalk.blue(`Models created`));
  } catch (error) {
    console.error(chalk.red(`Can't recreate the database: ${error.message}`));
  }
}

async function createModels() {
  try {
    await user.createCollection();
    await post.createCollection();
  } catch (error) {
    console.error(chalk.red(`Can't create the models: ${error.message}`));
  }
}
