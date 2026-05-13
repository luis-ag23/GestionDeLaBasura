const { obtenerListaHorarios } = require("../api/horarios.api");

async function cargarHorariosParaHome() {
  return obtenerListaHorarios();
}

async function cargarHorarioPorCodigoParaHome(codigo) {
  if (!codigo) return obtenerListaHorarios();
  const lista = await obtenerListaHorarios(codigo);
  return Array.isArray(lista) ? lista[0] : lista;
}

async function cargarListaParaHome(codigo) {
  if (!codigo) return cargarHorariosParaHome();
  const horario = await cargarHorarioPorCodigoParaHome(codigo);
  if (!horario) return [];
  return [horario];
}

module.exports = {
  cargarHorariosParaHome,
  cargarHorarioPorCodigoParaHome,
  cargarListaParaHome
};
