jest.mock("../../../bootstrap/horariosFactory");
const horariosFactory = require("../../../bootstrap/horariosFactory");
const {
  cargarHorariosParaHome,
  cargarHorarioPorCodigoParaHome,
  cargarListaParaHome
} = require("../controller/horarios.controller");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("horarios.controller", () => {
  test("debería cargar los horarios formateados para el home", async () => {
    const horariosFormateadosMock = [
      { codigo: "d1", titulo: "Distrito 1", pasaHoy: true },
      { codigo: "d2", titulo: "Distrito 2", pasaHoy: false }
    ];

    horariosFactory.cargarHorariosParaHome.mockResolvedValue(horariosFormateadosMock);

    const resultado = await cargarHorariosParaHome();

    expect(resultado).toEqual(horariosFormateadosMock);
    expect(horariosService.obtenerHorariosFormateados).toHaveBeenCalledTimes(1);
  });
  test("debería cargar un horario formateado por código para el home", async () => {
  const horarioFormateadoMock = {
    codigo: "d2",
    titulo: "Distrito 2",
    pasaHoy: false
  };

  horariosFactory.cargarHorarioPorCodigoParaHome.mockResolvedValue(horarioFormateadoMock);

  const resultado = await cargarHorarioPorCodigoParaHome("d2");

  expect(resultado).toEqual(horarioFormateadoMock);
  expect(horariosFactory.cargarHorarioPorCodigoParaHome).toHaveBeenCalledWith("d2");
});
test("debería devolver todos los horarios cuando el código viene vacío", async () => {
  const horariosFormateadosMock = [
    { codigo: "d1", titulo: "Distrito 1", pasaHoy: true },
    { codigo: "d2", titulo: "Distrito 2", pasaHoy: false }
  ];

  horariosFactory.cargarHorariosParaHome.mockResolvedValue(horariosFormateadosMock);

  const resultado = await cargarHorarioPorCodigoParaHome("");

  expect(resultado).toEqual(horariosFormateadosMock);
  expect(horariosFactory.cargarHorariosParaHome).toHaveBeenCalledTimes(1);
});
test("debería devolver una lista con un solo horario cuando se filtra por código", async () => {
  const horarioFormateadoMock = {
    codigo: "d2",
    titulo: "Distrito 2",
    pasaHoy: false
  };

  horariosFactory.cargarHorarioPorCodigoParaHome.mockResolvedValue(horarioFormateadoMock);

  const resultado = await cargarListaParaHome("d2");

  expect(resultado).toEqual([horarioFormateadoMock]);
});

test("debería devolver una lista completa cuando no se envía código", async () => {
  const horariosFormateadosMock = [
    { codigo: "d1", titulo: "Distrito 1", pasaHoy: true },
    { codigo: "d2", titulo: "Distrito 2", pasaHoy: false }
  ];

  horariosFactory.cargarHorariosParaHome.mockResolvedValue(horariosFormateadosMock);

  const resultado = await cargarListaParaHome("");

  expect(resultado).toEqual(horariosFormateadosMock);
});
});