const { cargarYRenderizarHorarios, enlazarFiltroDistrito } = require("./views/home.view");

async function iniciarHome() {
  try {
    console.log("🚀 Iniciando carga de horarios...");
    const horarios = await cargarYRenderizarHorarios("");
    console.log("✅ Horarios cargados:", horarios);
    enlazarFiltroDistrito();
    console.log("✅ Filtro de distrito enlazado");
  } catch (error) {
    console.error("❌ Error en iniciarHome:", error);
  }
}

// Esperar a que el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarHome);
} else {
  iniciarHome();
}