const express = require("express");
const cors = require("cors");

const horariosController = require("./src/features/horarios/controller/horarios.controller");
const reportesRoutes = require("./src/features/reportes/routes/reportes.routes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API de GestiónDeLaBasura funcionando" });
});

app.get("/api/horarios", async (req, res) => {
  try {
    const { codigo } = req.query;
    const data = await horariosController.cargarListaParaHome(codigo || "");
    res.json(data);
  } catch (error) {
    console.error("Error en /api/horarios:", error);
    res.status(500).json({ error: "Error al obtener horarios" });
  }
});

app.get("/api/horarios/:codigo", async (req, res) => {
  try {
    const { codigo } = req.params;
    const data = await horariosController.cargarHorarioPorCodigoParaHome(codigo);
    res.json(data);
  } catch (error) {
    console.error("Error en /api/horarios/:codigo:", error);
    res.status(500).json({ error: "Error al obtener horario" });
  }
});

app.use("/api/reportes", reportesRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;