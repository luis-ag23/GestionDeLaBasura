const horariosRepository = require("../db/horarios.repository");

async function obtenerHorarios() {
  const horarios = await horariosRepository.getAllHorarios();
  return horarios;
}

async function obtenerHorarioPorCodigo(codigo) {
  const horarios = await horariosRepository.getAllHorarios();
  return horarios.find((horario) => horario.codigo === codigo);
}

module.exports = {
  obtenerHorarios,
  obtenerHorarioPorCodigo
};