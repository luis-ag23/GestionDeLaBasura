function formatearHora(hora) {
  return hora.slice(0, 5);
}

function formatearTipo(tipoServicio) {
  if (tipoServicio === "contenedor") {
    return "Contenedor";
  }

  return "Domiciliario";
}

function formatearHorario(horario, diaActual) {
  return {
    codigo: horario.codigo,
    titulo: horario.nombre_distrito,
    subtitulo: horario.zona,
    turno: horario.turno,
    horarioTexto: construirHorarioTexto(horario.hora_inicio, horario.hora_fin),
    tipoLabel: formatearTipo(horario.tipo_servicio),
    dias: horario.dias,
    nota: horario.nota,
    color: horario.color,
    pasaHoy: diaActual ? pasaHoy(horario.dias, diaActual) : false
  };
}
function formatearHorarios(horarios) {
  return horarios.map(formatearHorario);
}

function construirHorarioTexto(horaInicio, horaFin) {
  return `${formatearHora(horaInicio)} - ${formatearHora(horaFin)}`;
}
function pasaHoy(dias, diaActual) {
  return dias.includes(diaActual);
}
module.exports = {
  formatearHorario,
  formatearHorarios,
  construirHorarioTexto,
  pasaHoy
};
