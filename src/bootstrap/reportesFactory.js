const reporteRepo = require("../adapters/persistence/pgReporteRepository");
const reportePresenter = require("../adapters/presenter/jsonReportePresenter");

const obtenerReportesUseCase = require("../application/reportes/obtenerReportes");
const obtenerReportesPorUsuarioUseCase = require("../application/reportes/obtenerReportesPorUsuario");
const crearReporteUseCase = require("../application/reportes/crearReporte");
const editarReporteUseCase = require("../application/reportes/editarReporte");

function obtenerReportes() {
  return obtenerReportesUseCase({
    reporteRepo,
    reportePresenter
  });
}

function obtenerReportesPorUsuario(usuarioId) {
  return obtenerReportesPorUsuarioUseCase(
    {
      reporteRepo,
      reportePresenter
    },
    usuarioId
  );
}

function crearReporte(datos) {
  return crearReporteUseCase(
    {
      reporteRepo,
      reportePresenter
    },
    datos
  );
}

function editarReporte(id, datos) {
  return editarReporteUseCase(
    {
      reporteRepo,
      reportePresenter
    },
    id,
    datos
  );
}

module.exports = {
  obtenerReportes,
  obtenerReportesPorUsuario,
  crearReporte,
  editarReporte
};