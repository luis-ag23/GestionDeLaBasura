async function obtenerHorariosPorDia({ horarioRepo }, dia) {
  const horarios = await horarioRepo.getAllHorarios();
  return horarios.filter((h) => (h.dias || []).includes(dia));
}

module.exports = obtenerHorariosPorDia;
