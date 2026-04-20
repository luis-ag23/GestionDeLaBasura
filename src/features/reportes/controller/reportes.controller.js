const reportesService = require("../service/reportes.service");

async function obtenerReportes(req, res) {
  try {
    const { usuario_id } = req.query;

    if (usuario_id) {
      const reportes = await reportesService.obtenerReportesPorUsuario(
        Number(usuario_id)
      );
      return res.status(200).json(reportes);
    }

    const reportes = await reportesService.obtenerReportes();
    return res.status(200).json(reportes);
  } catch (error) {
    console.error("Error al obtener reportes:", error);
    return res.status(500).json({
      message: "No se pudieron obtener los reportes."
    });
  }
}

async function crearReporte(req, res) {
  try {
    const { descripcion, ubicacion, imagen_url, usuario_id } = req.body;

    const nuevoReporte = await reportesService.crearReporte({
      descripcion,
      ubicacion,
      imagen_url,
      usuario_id
    });

    return res.status(201).json(nuevoReporte);
  } catch (error) {
    console.error("Error al crear reporte:", error);

    if (
      error.message === "La descripción es obligatoria." ||
      error.message === "La ubicación es obligatoria." ||
      error.message === "El usuario_id es obligatorio."
    ) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({
      message: "No se pudo crear el reporte."
    });
  }
}

module.exports = {
  obtenerReportes,
  crearReporte
};