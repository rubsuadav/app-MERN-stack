import listEndpoints from "express-list-endpoints";
import app from "../app.js";

export const getAllRoutes = (_req, res) => {
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
};
