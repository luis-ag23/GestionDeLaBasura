import {
  cargarYRenderizarReportes,
  enlazarEventosModal,
  enlazarFormulario
} from "./features/reportes/view/reportes.view.js";

console.log("reportes.js cargado");

async function init() {
  console.log("init arrancó");
  enlazarEventosModal();
  enlazarFormulario();
  await cargarYRenderizarReportes();
}

init();