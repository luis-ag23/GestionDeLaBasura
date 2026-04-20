function formatearFecha(fecha) {
  if (!fecha) {
    return null;
  }

  return new Date(fecha).toISOString();
}

function formatearEstado(estado) {
  if (!estado) {
    return "pendiente";
  }

  return estado;
}

function formatearReporte(reporte) {
  return {
    id: reporte.id,
    descripcion: reporte.descripcion,
    ubicacion: reporte.ubicacion,
    imagen_url: reporte.imagen_url,
    estado: formatearEstado(reporte.estado),
    usuario_id: reporte.usuario_id,
    created_at: formatearFecha(reporte.created_at)
  };
}

function formatearReportes(reportes) {
  return reportes.map(formatearReporte);
}

module.exports = {
  formatearReporte,
  formatearReportes
};