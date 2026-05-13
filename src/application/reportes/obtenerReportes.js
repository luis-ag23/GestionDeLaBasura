async function obtenerReportes({ reporteRepo, reportePresenter }) {
  const reportes = await reporteRepo.getAllReportes();
  return reportePresenter.formatearReportes(reportes);
}

module.exports = obtenerReportes;
