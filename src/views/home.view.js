const horariosApi = require("../api/horarios.api");

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

  if (!grid) return;

  grid.innerHTML = horarios.map(renderizarTarjeta).join("");
}

async function cargarYRenderizarHorarios(codigo) {
  const horarios = await horariosApi.obtenerListaHorarios(codigo);
  renderizarHorarios(horarios);
}

function enlazarFiltroDistrito() {
  const select = document.getElementById("select-distrito");

  if (!select) return;

  select.addEventListener("change", function () {
    cargarYRenderizarHorarios(this.value);
  });
}

module.exports = {
  renderizarHorarios,
  cargarYRenderizarHorarios,
  enlazarFiltroDistrito
};