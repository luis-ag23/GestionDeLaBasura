const horariosApi = require("../api/horarios.api");

function renderizarDias(dias) {
  return dias
    .map((dia) => `<span class="dia-chip">${dia.substring(0, 3)}</span>`)
    .join("");
}

function renderizarTarjeta(horario) {
  return `
    <div class="zona-card zona-card--${horario.color} ${horario.pasaHoy ? "zona-card--recoge-hoy" : ""}">
      ${horario.pasaHoy ? '<div class="zona-card__badge-hoy">🚛 Pasa hoy</div>' : ""}
      
      <div class="zona-card__head">
        <div>
          <span class="zona-card__numero">${horario.titulo}</span>
          <h3 class="zona-card__zona">${horario.subtitulo}</h3>
        </div>
        <span class="zona-card__tipo">${horario.tipoLabel}</span>
      </div>

      <div class="zona-card__horario">
        <span class="zona-card__turno">⏰ ${horario.turno}</span>
        <span class="zona-card__hora">${horario.horarioTexto}</span>
      </div>

      <div class="zona-card__dias">
        ${renderizarDias(horario.dias)}
      </div>

      <p class="zona-card__nota">${horario.nota}</p>
    </div>
  `;
}

function renderizarHorarios(horarios) {
  const grid = document.getElementById("zonas-grid");

  if (!grid) {
    console.error("No existe #zonas-grid");
    return;
  }

  grid.innerHTML = horarios.map(renderizarTarjeta).join("");
}

async function cargarYRenderizarHorarios(codigo) {
  const horarios = await horariosApi.obtenerListaHorarios(codigo);
  renderizarHorarios(horarios);
}

function enlazarFiltroDistrito() {
  const select = document.getElementById("select-distrito");

  if (!select) {
    console.error("No existe #select-distrito");
    return;
  }

  select.addEventListener("change", function () {
    cargarYRenderizarHorarios(this.value);
  });
}

module.exports = {
  renderizarHorarios,
  cargarYRenderizarHorarios,
  enlazarFiltroDistrito
};