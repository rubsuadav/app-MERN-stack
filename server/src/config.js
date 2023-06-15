import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 8000;
export const MONGO_URL = process.env.MONGO_URL;
