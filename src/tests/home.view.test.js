/** @jest-environment jsdom */

const horariosController = require("../controllers/horarios.controller");
const {
  renderizarHorarios,
  cargarYRenderizarHorarios
} = require("../views/home.view");

jest.mock("../controllers/horarios.controller");

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
  test("debería cargar horarios desde el controller y renderizarlos en el grid", async () => {
  document.body.innerHTML = '<div id="zonas-grid"></div>';

  const horariosMock = [
    { codigo: "d1", titulo: "Distrito 1", subtitulo: "Centro Histórico" }
  ];

  horariosController.cargarListaParaHome.mockResolvedValue(horariosMock);

  await cargarYRenderizarHorarios("");

  const tarjetas = document.querySelectorAll(".zona-card");
  expect(tarjetas.length).toBe(1);
  expect(horariosController.cargarListaParaHome).toHaveBeenCalledWith("");
});
});