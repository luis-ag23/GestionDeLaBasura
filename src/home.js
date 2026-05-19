const { cargarYRenderizarHorarios, enlazarFiltroDistrito } = require("./features/horarios/view/home.view");
const { enlazarMapaZonas } = require("./features/mapa/view/homeMapa.view");

async function iniciarHome() {
  try {
    console.log("Iniciando home...");
    enlazarMapaZonas();
    await cargarYRenderizarHorarios("");
    enlazarFiltroDistrito();
    console.log("Home cargado correctamente");
  } catch (error) {
    console.error("Error al iniciar home:", error);
  }
}

iniciarHome();