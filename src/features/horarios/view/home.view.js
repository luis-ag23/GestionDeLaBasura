const { cargarListaParaHome } = require("../controller/horarios.controller.browser");

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

  // Si la API no devolvió datos, mostramos tarjetas placeholder
  if (!horarios || horarios.length === 0) {
    const placeholders = [
      { titulo: "Distrito 1", subtitulo: "Centro Histórico", tipoLabel: "Domiciliario", turno: "Mañana", horarioTexto: "06:00 - 14:00", dias: ["Lunes","Miércoles","Viernes"], nota: "Sin datos en línea", color: "verde", pasaHoy: false },
      { titulo: "Distrito 2", subtitulo: "Queru Queru", tipoLabel: "Contenedor", turno: "Tarde", horarioTexto: "16:00 - 00:00", dias: ["Martes","Jueves"], nota: "Sin datos en línea", color: "azul", pasaHoy: false },
      { titulo: "Distrito 3", subtitulo: "Mayorazgo", tipoLabel: "Domiciliario", turno: "Mañana", horarioTexto: "06:00 - 14:00", dias: ["Lunes","Jueves"], nota: "Sin datos en línea", color: "naranja", pasaHoy: false },
      { titulo: "Distrito 4", subtitulo: "Hipódromo", tipoLabel: "Contenedor", turno: "Tarde", horarioTexto: "16:00 - 00:00", dias: ["Miércoles","Sábado"], nota: "Sin datos en línea", color: "gris", pasaHoy: false }
    ];

    grid.innerHTML = placeholders.map(renderizarTarjeta).join("");
    return;
  }

  grid.innerHTML = horarios.map(renderizarTarjeta).join("");
}

async function cargarYRenderizarHorarios(codigo) {
  const horarios = await obtenerListaHorarios(codigo);
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