const horariosService = require("../services/horarios.service");
const { cargarHorariosParaHome } = require("../controllers/horarios.controller");

jest.mock("../services/horarios.service");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("horarios.controller", () => {
  test("debería cargar los horarios formateados para el home", async () => {
    const horariosFormateadosMock = [
      { codigo: "d1", titulo: "Distrito 1", pasaHoy: true },
      { codigo: "d2", titulo: "Distrito 2", pasaHoy: false }
    ];

    horariosService.obtenerHorariosFormateados.mockResolvedValue(horariosFormateadosMock);

    const resultado = await cargarHorariosParaHome();

    expect(resultado).toEqual(horariosFormateadosMock);
    expect(horariosService.obtenerHorariosFormateados).toHaveBeenCalledTimes(1);
  });
});