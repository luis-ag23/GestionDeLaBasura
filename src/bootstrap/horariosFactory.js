const horarioRepo = require('../adapters/persistence/pgHorarioRepository');
const horarioPresenter = require('../adapters/presenter/jsonHorarioPresenter');
const obtenerHorarios = require('../application/horarios/obtenerHorarios');
const obtenerHorarioPorCodigo = require('../application/horarios/obtenerHorarioPorCodigo');
const obtenerHorariosPorDia = require('../application/horarios/obtenerHorariosPorDia');

function cargarHorariosParaHome() {
  return obtenerHorarios({ horarioRepo });
}

function cargarHorarioPorCodigoParaHome(codigo) {
  return obtenerHorarioPorCodigo({ horarioRepo }, codigo);
}

function cargarHorariosFormateados(diaActual) {
  return obtenerHorarios({ horarioRepo }).then((h) => horarioPresenter.formatearHorarios(h, diaActual));
}

function cargarHorarioFormateadoPorCodigo(codigo) {
  return obtenerHorarioPorCodigo({ horarioRepo }, codigo).then((h) => (h ? horarioPresenter.formatearHorario(h) : undefined));
}

module.exports = {
  cargarHorariosParaHome,
  cargarHorarioPorCodigoParaHome,
  cargarHorariosFormateados,
  cargarHorarioFormateadoPorCodigo
};
