const horariosService = require("../services/horarios.service");

async function cargarHorariosParaHome() {
  return horariosService.obtenerHorariosFormateados();
}

async function cargarHorarioPorCodigoParaHome(codigo) {
  return horariosService.obtenerHorarioFormateadoPorCodigo(codigo);
}

module.exports = {
  cargarHorariosParaHome,
  cargarHorarioPorCodigoParaHome
};