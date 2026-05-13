async function obtenerHorarios({ horarioRepo }) {
  return horarioRepo.getAllHorarios();
}

module.exports = obtenerHorarios;
