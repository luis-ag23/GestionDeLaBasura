const horariosRepository = require("../db/horarios.repository");

async function obtenerHorarios() {
  const horarios = await horariosRepository.getAllHorarios();
  return horarios;
}

async function obtenerHorarioPorCodigo(codigo) {
  const horarios = await horariosRepository.getAllHorarios();
  return horarios.find((horario) => horario.codigo === codigo);
}
async function obtenerHorariosPorDia(dia) {
  const horarios = await horariosRepository.getAllHorarios();
  return horarios.filter((horario) => horario.dias.includes(dia));
}
async function obtenerHorariosDeHoy(dia) {
  const horarios = await horariosRepository.getAllHorarios();
  return horarios.filter((horario) => horario.dias.includes(dia));
}

module.exports = {
  obtenerHorarios,
  obtenerHorarioPorCodigo,
  obtenerHorariosPorDia,
  obtenerHorariosDeHoy
};