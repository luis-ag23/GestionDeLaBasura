const horariosRepository = require("../repository/horarios.repository");
const horariosPresenter = require("../presenter/horarios.presenter");
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
  return obtenerHorariosPorDia(dia);
}
async function obtenerHorariosFormateados() {
  const horarios = await horariosRepository.getAllHorarios();
  return horariosPresenter.formatearHorarios(horarios);
}
async function obtenerHorarioFormateadoPorCodigo(codigo) {
  const horario = await obtenerHorarioPorCodigo(codigo);

  if (!horario) {
    return undefined;
  }

  return horariosPresenter.formatearHorario(horario);
}
module.exports = {
  obtenerHorarios,
  obtenerHorarioPorCodigo,
  obtenerHorariosPorDia,
  obtenerHorariosDeHoy,
  obtenerHorariosFormateados,
  obtenerHorarioFormateadoPorCodigo
  
};

