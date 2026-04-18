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
  grid.innerHTML = horarios.map(renderizarTarjeta).join("");
}

module.exports = {
  renderizarHorarios
};