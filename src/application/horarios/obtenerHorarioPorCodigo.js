async function obtenerHorarioPorCodigo({ horarioRepo }, codigo) {
  const horarios = await horarioRepo.getAllHorarios();
  return horarios.find((h) => h.codigo === codigo);
}

module.exports = obtenerHorarioPorCodigo;
