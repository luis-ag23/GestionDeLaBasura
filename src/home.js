const { cargarYRenderizarHorarios, enlazarFiltroDistrito } = require("./views/home.view");

async function iniciarHome() {
  await cargarYRenderizarHorarios("");
  enlazarFiltroDistrito();
}

iniciarHome();