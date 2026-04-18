const horariosService = require("../services/horarios.service");

async function cargarHorariosParaHome() {
  return horariosService.obtenerHorariosFormateados();
}

module.exports = {
  cargarHorariosParaHome
};