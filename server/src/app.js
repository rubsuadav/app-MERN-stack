import express from "express";
import morgan from "morgan";
import cors from "cors";
//import employeersRoutes from "./routes/employeers.routes.js";
import listEndpoints from "express-list-endpoints";
import "./config.js";

const app = express();

app.use(express.static("./public"));
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//app.use("/api", employeersRoutes);

//MUESTRA TODAS LAS RUTAS DISPONIBLES
app.get("/", (_req, res) => {
  const routes = listEndpoints(app).map((route) => {
    return {
      path: route.path,
      methods: route.methods,
    };
  });
  const html = `
    <html>
      <head>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <h1>Endpoints Disponibles</h1>
        <table>
          <thead>
            <tr>
              <th>Rutas</th>
              <th>Metodos</th>
            </tr>
          </thead>
          <tbody>
        ${routes
          .map(
            (route) => `
              <tr>
                <td>${route.path}</td>
                <td>${route.methods.join(", ")}</td>
              </tr>
            `
          )
          .join("")}
          </tbody>
        </table>
      </body>
    </html>
  `;
  res.send(html);
});

app.use((_req, res) => {
  res.status(404).json({ msg: "Not found" });
});

export default app;
