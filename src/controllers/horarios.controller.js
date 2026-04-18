const horariosService = require("../services/horarios.service");
const {
  cargarHorariosParaHome,
  cargarHorarioPorCodigoParaHome
} = require("../controllers/horarios.controller");

async function cargarHorariosParaHome() {
  return horariosService.obtenerHorariosFormateados();
}

module.exports = {
  cargarHorariosParaHome
};