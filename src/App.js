const express = require("express");
const reportesRoutes = require("./features/reportes/routes/reportes.routes");
const usuariosRoutes = require("./features/usuarios/routes/usuarios.routes"); 

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "API de GestiónDeLaBasura funcionando" });
});

app.use("/api/reportes", reportesRoutes);
app.use("/api/usuarios", usuariosRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;