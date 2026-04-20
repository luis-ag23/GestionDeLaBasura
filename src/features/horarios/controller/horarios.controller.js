const horariosService = require("../service/horarios.service");

async function cargarHorariosParaHome() {
  return horariosService.obtenerHorariosFormateados();
}

async function cargarHorarioPorCodigoParaHome(codigo) {
  if (!codigo) {
    return horariosService.obtenerHorariosFormateados();
  }

  return horariosService.obtenerHorarioFormateadoPorCodigo(codigo);
}

async function cargarListaParaHome(codigo) {
  if (!codigo) {
    return cargarHorariosParaHome();
  }

  const horario = await cargarHorarioPorCodigoParaHome(codigo);

  if (!horario) {
    return [];
  }

  return [horario];
}

module.exports = {
  cargarHorariosParaHome,
  cargarHorarioPorCodigoParaHome,
  cargarListaParaHome
};