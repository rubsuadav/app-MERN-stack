import app from "./app.js";
import chalk from "chalk";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";

connectDB();
app.listen(PORT, () => {
  console.log(
    chalk.rgb(200, 120, 80)(`Server running on http://localhost:${PORT}`)
  );
});
