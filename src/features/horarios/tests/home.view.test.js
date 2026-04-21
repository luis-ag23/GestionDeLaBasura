/** @jest-environment jsdom */

const homeView = require("../view/home.view");
const horariosApi = require("../api/horarios.api");

const {
  renderizarHorarios,
  cargarYRenderizarHorarios,
  enlazarFiltroDistrito
} = homeView;

jest.mock("../api/horarios.api");

describe("home.view", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '<div id="zonas-grid"></div>';
  });

  test("debería renderizar una tarjeta por cada horario recibido", () => {
    const horarios = [
      {
        codigo: "d1",
        titulo: "Distrito 1",
        subtitulo: "Centro Histórico",
        turno: "Mañana",
        horarioTexto: "06:00 - 14:00",
        tipoLabel: "Domiciliario",
        dias: ["Lunes", "Miércoles", "Viernes"],
        nota: "Servicio regular",
        color: "verde",
        pasaHoy: false
      },
      {
        codigo: "d2",
        titulo: "Distrito 2",
        subtitulo: "Queru Queru / Sarco",
        turno: "Tarde",
        horarioTexto: "16:00 - 00:00",
        tipoLabel: "Contenedor",
        dias: ["Martes", "Jueves", "Sábado"],
        nota: "Servicio regular",
        color: "azul",
        pasaHoy: false
      }
    ];

    renderizarHorarios(horarios);

    const tarjetas = document.querySelectorAll(".zona-card");
    expect(tarjetas.length).toBe(2);
  });
  test("debería cargar horarios desde el controller y renderizarlos en el grid", async () => {
  document.body.innerHTML = '<div id="zonas-grid"></div>';

  const horariosMock = [
    {
      codigo: "d1",
      titulo: "Distrito 1",
      subtitulo: "Centro Histórico",
      turno: "Mañana",
      horarioTexto: "06:00 - 14:00",
      tipoLabel: "Domiciliario",
      dias: ["Lunes", "Miércoles", "Viernes"],
      nota: "Servicio regular",
      color: "verde",
      pasaHoy: false
    }
  ];

  horariosApi.obtenerListaHorarios.mockResolvedValue(horariosMock);

  await cargarYRenderizarHorarios("");

  const tarjetas = document.querySelectorAll(".zona-card");
  expect(tarjetas.length).toBe(1);
  expect(horariosApi.obtenerListaHorarios).toHaveBeenCalledWith("");
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
    {
      codigo: "d2",
      titulo: "Distrito 2",
      subtitulo: "Queru Queru / Sarco",
      turno: "Tarde",
      horarioTexto: "16:00 - 00:00",
      tipoLabel: "Contenedor",
      dias: ["Martes", "Jueves", "Sábado"],
      nota: "Servicio regular",
      color: "azul",
      pasaHoy: false
    }
  ];

  horariosApi.obtenerListaHorarios.mockResolvedValue(horariosMock);

  // Ejecutamos la función que enlaza el evento
  enlazarFiltroDistrito();

  // Simulamos cambio en el select
  const select = document.getElementById("select-distrito");
  select.value = "d2";
  select.dispatchEvent(new Event("change"));

  expect(horariosApi.obtenerListaHorarios).toHaveBeenCalledWith("d2");
});
});