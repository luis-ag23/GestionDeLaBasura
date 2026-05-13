let cargarHorariosParaHome, cargarHorarioPorCodigoParaHome;

if (typeof window !== "undefined") {
  // En el navegador usamos el adaptador de API (fetch)
  const { obtenerListaHorarios } = require("../api/horarios.api");

  cargarHorariosParaHome = async () => {
    return obtenerListaHorarios();
  };

  cargarHorarioPorCodigoParaHome = async (codigo) => {
    if (!codigo) return obtenerListaHorarios();
    const lista = await obtenerListaHorarios(codigo);
    return Array.isArray(lista) ? lista[0] : lista;
  };
} else {
  // En Node usamos la fábrica del backend
  const horariosFactory = require("../../../bootstrap/horariosFactory");

  cargarHorariosParaHome = async () => horariosFactory.cargarHorariosParaHome();
  cargarHorarioPorCodigoParaHome = async (codigo) => {
    if (!codigo) return horariosFactory.cargarHorariosParaHome();
    return horariosFactory.cargarHorarioPorCodigoParaHome(codigo);
  };
}

async function cargarListaParaHome(codigo) {
  if (!codigo) {
    return cargarHorariosParaHome();
  }

  const horario = await cargarHorarioPorCodigoParaHome(codigo);

  if (!horario) return [];
  return [horario];
}

module.exports = {
  cargarHorariosParaHome,
  cargarHorarioPorCodigoParaHome,
  cargarListaParaHome
};