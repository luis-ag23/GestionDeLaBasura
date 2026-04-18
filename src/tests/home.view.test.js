/** @jest-environment jsdom */

const { renderizarHorarios } = require("../views/home.view");

describe("home.view", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="zonas-grid"></div>';
  });

  test("debería renderizar una tarjeta por cada horario recibido", () => {
    const horarios = [
      { codigo: "d1", titulo: "Distrito 1", subtitulo: "Centro Histórico" },
      { codigo: "d2", titulo: "Distrito 2", subtitulo: "Queru Queru / Sarco" }
    ];

    renderizarHorarios(horarios);

    const tarjetas = document.querySelectorAll(".zona-card");
    expect(tarjetas.length).toBe(2);
  });
});