/** @jest-environment jsdom */

const homeView = require("../views/home.view");
const horariosController = require("../controllers/horarios.controller");

const {
  renderizarHorarios,
  cargarYRenderizarHorarios,
  enlazarFiltroDistrito
} = homeView;

jest.mock("../controllers/horarios.controller");

describe("home.view", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
test("debería cargar y renderizar horarios cuando cambia el select de distrito", () => {
  document.body.innerHTML = `
    <select id="select-distrito">
      <option value="">Todos</option>
      <option value="d2">Distrito 2</option>
    </select>
    <div id="zonas-grid"></div>
  `;

  const horariosMock = [
    { codigo: "d2", titulo: "Distrito 2", subtitulo: "Queru Queru / Sarco" }
  ];

  horariosController.cargarListaParaHome.mockResolvedValue(horariosMock);

  // Ejecutamos la función que enlaza el evento
  enlazarFiltroDistrito();

  // Simulamos cambio en el select
  const select = document.getElementById("select-distrito");
  select.value = "d2";
  select.dispatchEvent(new Event("change"));

  expect(horariosController.cargarListaParaHome).toHaveBeenCalledWith("d2");
});
});