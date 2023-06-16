import express from "express";
import morgan from "morgan";
import cors from "cors";

//local import
import indexRoutes from "./routes/index.routes.js";
import postRpoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import "./config.js";

const app = express();

app.use(express.static("./public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/", indexRoutes);
app.use('/api/posts', postRpoutes);
app.use("/api/users", userRoutes);

app.use((_req, res) => {
  res.status(404).json({ msg: "Not found" });
});

export default app;
