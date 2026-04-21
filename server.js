const express = require("express");
const cors = require("cors");
const horariosController = require("./src/features/horarios/controller/horarios.controller");
const usuariosRoutes = require("./src/features/usuarios/routes/usuarios.routes.js");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/usuarios", usuariosRoutes);
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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});