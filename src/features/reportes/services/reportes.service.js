const reportesRepository = require("../repository/reportes.repository");
const reportesPresenter = require("../presenter/reportes.presenter");

async function obtenerReportes() {
  const reportes = await reportesRepository.getAllReportes();
  return reportesPresenter.formatearReportes(reportes);
}

async function obtenerReportesPorUsuario(usuarioId) {
  const reportes = await reportesRepository.getReportesByUsuarioId(usuarioId);
  return reportesPresenter.formatearReportes(reportes);
}

async function crearReporte(datos) {
  if (!datos.descripcion || !datos.descripcion.trim()) {
    throw new Error("La descripción es obligatoria.");
  }

  if (!datos.ubicacion || !datos.ubicacion.trim()) {
    throw new Error("La ubicación es obligatoria.");
  }

  if (!datos.usuario_id) {
    throw new Error("El usuario_id es obligatorio.");
  }

  const reporteCreado = await reportesRepository.createReporte({
    descripcion: datos.descripcion.trim(),
    ubicacion: datos.ubicacion.trim(),
    imagen_url: datos.imagen_url?.trim() || null,
    usuario_id: Number(datos.usuario_id)
  });

  return reportesPresenter.formatearReporte(reporteCreado);
}

module.exports = {
  obtenerReportes,
  obtenerReportesPorUsuario,
  crearReporte
};