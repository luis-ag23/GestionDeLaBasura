const {
  cargarYRenderizarReportes,
  enlazarEventosModal,
  enlazarFormulario
} = require("./features/reportes/view/reportes.view");

console.log("reportes.js cargado");

async function init() {
  console.log("init arrancó");
  enlazarEventosModal();
  enlazarFormulario();
  await cargarYRenderizarReportes();
}

init();