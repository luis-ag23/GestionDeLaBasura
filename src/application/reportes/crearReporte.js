async function crearReporte({ reporteRepo, reportePresenter }, datos) {
  if (!datos.descripcion || !datos.descripcion.trim()) {
    throw new Error("La descripción es obligatoria.");
  }

  if (!datos.ubicacion || !datos.ubicacion.trim()) {
    throw new Error("La ubicación es obligatoria.");
  }

  if (!datos.usuario_id) {
    throw new Error("El usuario_id es obligatorio.");
  }

  const reporteCreado = await reporteRepo.createReporte({
    descripcion: datos.descripcion.trim(),
    ubicacion: datos.ubicacion.trim(),
    imagen_url: datos.imagen_url?.trim() || null,
    usuario_id: Number(datos.usuario_id)
  });

  return reportePresenter.formatearReporte(reporteCreado);
}

module.exports = crearReporte;
