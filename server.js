const express = require("express");
const horariosController = require("./src/controllers/horarios.controller");

const app = express();
const PORT = 3000;

// Obtener todos o filtrados
app.get("/api/horarios", async (req, res) => {
  const { codigo } = req.query;

  const data = await horariosController.cargarListaParaHome(codigo || "");
  res.json(data);
});

// Obtener uno por código
app.get("/api/horarios/:codigo", async (req, res) => {
  const { codigo } = req.params;

  const data = await horariosController.cargarHorarioPorCodigoParaHome(codigo);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});