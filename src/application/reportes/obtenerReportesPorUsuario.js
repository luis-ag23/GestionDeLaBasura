async function obtenerReportesPorUsuario({ reporteRepo, reportePresenter }, usuarioId) {
  const reportes = await reporteRepo.getReportesByUsuarioId(usuarioId);
  return reportePresenter.formatearReportes(reportes);
}

module.exports = obtenerReportesPorUsuario;
