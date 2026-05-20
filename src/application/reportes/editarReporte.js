async function editarReporte({ reporteRepo, reportePresenter }, id, datos) {
  if (!id) {
    throw new Error("El id del reporte es obligatorio.");
  }

  if (!datos.descripcion) {
    throw new Error("La descripción es obligatoria.");
  }

  if (!datos.ubicacion) {
    throw new Error("La ubicación es obligatoria.");
  }

  if (!datos.usuario_id) {
    throw new Error("El usuario_id es obligatorio.");
  }

  const reporteExistente = await reporteRepo.obtenerPorId(id);

  if (!reporteExistente) {
    throw new Error("Reporte no encontrado.");
  }

  const reporteActualizado = await reporteRepo.actualizar(id, {
    descripcion: datos.descripcion,
    ubicacion: datos.ubicacion,
    imagen_url: datos.imagen_url,
    usuario_id: datos.usuario_id
  });

  return reportePresenter.toJson(reporteActualizado);
}

module.exports = editarReporte;