import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

//local import
import indexRoutes from "./routes/index.routes.js";
import authRoutes from "./routes/auth.routes.js";
import postRpoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import "./config.js";

const app = express();

app.use(express.static("./public"));
app.use(morgan("dev"));
// Configurar el límite del cuerpo de la solicitud
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRpoutes);
app.use("/api/users", userRoutes);

app.use((_req, res) => {
  res.status(404).json({ msg: "Not found" });
});

export default app;
