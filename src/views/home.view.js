const horariosController = require("../controllers/horarios.controller");

function renderizarTarjeta(horario) {
  return `
    <div class="zona-card">
      <h3>${horario.titulo}</h3>
      <p>${horario.subtitulo}</p>
    </div>
  `;
}

function renderizarHorarios(horarios) {
  const grid = document.getElementById("zonas-grid");
  if (!grid) return;

  const listaHorarios = Array.isArray(horarios) ? horarios : [];
  grid.innerHTML = listaHorarios.map(renderizarTarjeta).join("");
}

async function cargarYRenderizarHorarios(codigo) {
  const horarios = await horariosController.cargarListaParaHome(codigo);
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