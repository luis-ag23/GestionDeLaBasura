const horariosController = require("../controllers/horarios.controller");

function renderizarTarjeta(horario) {
  return `
    <div class="zona-card ${horario.pasaHoy ? "zona-card--recoge-hoy" : ""}">
      <h3>${horario.titulo}</h3>
      <p>${horario.subtitulo}</p>
      <p>${horario.turno}</p>
      <p>${horario.horarioTexto}</p>
      <p>${horario.tipoLabel}</p>
    </div>
  `;
}

function renderizarHorarios(horarios) {
  const grid = document.getElementById("zonas-grid");

  if (!grid) {
    console.error("❌ No se encontró el elemento con id='zonas-grid' en el HTML");
    return;
  }

  if (!horarios || horarios.length === 0) {
    console.warn("⚠️ No hay horarios para mostrar");
    grid.innerHTML = "<p>No hay horarios disponibles</p>";
    return;
  }

  console.log(`📍 Renderizando ${horarios.length} horarios`);
  grid.innerHTML = horarios.map(renderizarTarjeta).join("");
}

async function cargarYRenderizarHorarios(codigo) {
  try {
    console.log("📥 Cargando horarios con código:", codigo || "(todos)");
    const horarios = await horariosController.cargarListaParaHome(codigo);
    console.log("📦 Horarios obtenidos:", horarios);
    renderizarHorarios(horarios);
    return horarios;
  } catch (error) {
    console.error("❌ Error al cargar horarios:", error);
    renderizarHorarios([]);
  }
}

function enlazarFiltroDistrito() {
  const select = document.getElementById("select-distrito");

  if (!select) {
    console.error("❌ No se encontró el elemento con id='select-distrito' en el HTML");
    return;
  }

  select.addEventListener("change", function () {
    console.log("🔄 Filtro cambiado a:", this.value);
    cargarYRenderizarHorarios(this.value);
  });
}

module.exports = {
  renderizarHorarios,
  cargarYRenderizarHorarios,
  enlazarFiltroDistrito
};