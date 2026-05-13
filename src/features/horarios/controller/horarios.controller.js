const horariosFactory = require("../../../bootstrap/horariosFactory");

async function cargarHorariosParaHome() {
  return horariosFactory.cargarHorariosParaHome();
}

async function cargarHorarioPorCodigoParaHome(codigo) {
  if (!codigo) {
    return horariosFactory.cargarHorariosParaHome();
  }

  return horariosFactory.cargarHorarioPorCodigoParaHome(codigo);
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