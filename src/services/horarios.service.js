const horariosRepository = require("../db/horarios.repository");

async function obtenerHorarios() {
  const horarios = await horariosRepository.getAllHorarios();

  // aquí luego meteremos lógica TDD (filtrar, transformar, etc)
  return horarios;
}

module.exports = {
  obtenerHorarios
};