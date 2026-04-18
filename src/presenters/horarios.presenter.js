function formatearHora(hora) {
  return hora.slice(0, 5);
}

function formatearTipo(tipoServicio) {
  if (tipoServicio === "contenedor") {
    return "Contenedor";
  }

  return "Domiciliario";
}

function formatearHorario(horario) {
  return {
    codigo: horario.codigo,
    titulo: horario.nombre_distrito,
    subtitulo: horario.zona,
    turno: horario.turno,
    horarioTexto: `${formatearHora(horario.hora_inicio)} - ${formatearHora(horario.hora_fin)}`,
    tipoLabel: formatearTipo(horario.tipo_servicio),
    dias: horario.dias,
    nota: horario.nota,
    color: horario.color
  };
}

module.exports = {
  formatearHorario
};