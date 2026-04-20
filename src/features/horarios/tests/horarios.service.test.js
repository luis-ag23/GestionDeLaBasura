const horariosRepository = require("../repository/horarios.repository");
const horariosPresenter = require("../presenter/horarios.presenter");
const {
  obtenerHorarios,
  obtenerHorarioPorCodigo,
  obtenerHorariosPorDia,
  obtenerHorariosDeHoy,
  obtenerHorariosFormateados,
  obtenerHorarioFormateadoPorCodigo
} = require("../service/horarios.service");

jest.mock("../repository/horarios.repository");
jest.mock("../presenter/horarios.presenter");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("horarios.service", () => {
  test("debería devolver todos los horarios que entrega el repository", async () => {
    const horariosMock = [
      { codigo: "d1", nombre_distrito: "Distrito 1" },
      { codigo: "d2", nombre_distrito: "Distrito 2" }
    ];

    horariosRepository.getAllHorarios.mockResolvedValue(horariosMock);

    const resultado = await obtenerHorarios();

    expect(resultado).toEqual(horariosMock);
    expect(horariosRepository.getAllHorarios).toHaveBeenCalledTimes(1);
  });

  test("debería devolver un horario por su código", async () => {
    const horariosMock = [
      { codigo: "d1", nombre_distrito: "Distrito 1" },
      { codigo: "d2", nombre_distrito: "Distrito 2" }
    ];

    horariosRepository.getAllHorarios.mockResolvedValue(horariosMock);

    const resultado = await obtenerHorarioPorCodigo("d2");

    expect(resultado).toEqual({ codigo: "d2", nombre_distrito: "Distrito 2" });
  });

  test("debería devolver undefined si el código no existe", async () => {
    const horariosMock = [
      { codigo: "d1", nombre_distrito: "Distrito 1" },
      { codigo: "d2", nombre_distrito: "Distrito 2" }
    ];

    horariosRepository.getAllHorarios.mockResolvedValue(horariosMock);

    const resultado = await obtenerHorarioPorCodigo("d99");

    expect(resultado).toBeUndefined();
  });

  test("debería devolver los horarios que incluyen un día específico", async () => {
    const horariosMock = [
      { codigo: "d1", nombre_distrito: "Distrito 1", dias: ["Lunes", "Miércoles", "Viernes"] },
      { codigo: "d2", nombre_distrito: "Distrito 2", dias: ["Martes", "Jueves", "Sábado"] },
      { codigo: "d3", nombre_distrito: "Distrito 3", dias: ["Lunes", "Jueves", "Sábado"] }
    ];

    horariosRepository.getAllHorarios.mockResolvedValue(horariosMock);

    const resultado = await obtenerHorariosPorDia("Lunes");

    expect(resultado).toEqual([
      { codigo: "d1", nombre_distrito: "Distrito 1", dias: ["Lunes", "Miércoles", "Viernes"] },
      { codigo: "d3", nombre_distrito: "Distrito 3", dias: ["Lunes", "Jueves", "Sábado"] }
    ]);
  });

  test("debería devolver los horarios del día actual", async () => {
    const horariosMock = [
      { codigo: "d1", nombre_distrito: "Distrito 1", dias: ["Lunes", "Miércoles", "Viernes"] },
      { codigo: "d2", nombre_distrito: "Distrito 2", dias: ["Martes", "Jueves", "Sábado"] },
      { codigo: "d3", nombre_distrito: "Distrito 3", dias: ["Lunes", "Jueves", "Sábado"] }
    ];

    horariosRepository.getAllHorarios.mockResolvedValue(horariosMock);

    const resultado = await obtenerHorariosDeHoy("Lunes");

    expect(resultado).toEqual([
      { codigo: "d1", nombre_distrito: "Distrito 1", dias: ["Lunes", "Miércoles", "Viernes"] },
      { codigo: "d3", nombre_distrito: "Distrito 3", dias: ["Lunes", "Jueves", "Sábado"] }
    ]);
  });

  test("debería devolver los horarios formateados para la UI", async () => {
    const horariosMock = [
      { codigo: "d1", nombre_distrito: "Distrito 1" },
      { codigo: "d2", nombre_distrito: "Distrito 2" }
    ];

    const horariosFormateadosMock = [
      { codigo: "d1", titulo: "Distrito 1" },
      { codigo: "d2", titulo: "Distrito 2" }
    ];

    horariosRepository.getAllHorarios.mockResolvedValue(horariosMock);
    horariosPresenter.formatearHorarios.mockReturnValue(horariosFormateadosMock);

    const resultado = await obtenerHorariosFormateados();

    expect(resultado).toEqual(horariosFormateadosMock);
    expect(horariosRepository.getAllHorarios).toHaveBeenCalledTimes(1);
    expect(horariosPresenter.formatearHorarios).toHaveBeenCalledWith(horariosMock);
  });
  test("debería devolver un horario formateado por su código", async () => {
  const horarioMock = { codigo: "d2", nombre_distrito: "Distrito 2" };
  const horarioFormateadoMock = { codigo: "d2", titulo: "Distrito 2" };

  horariosRepository.getAllHorarios.mockResolvedValue([
    { codigo: "d1", nombre_distrito: "Distrito 1" },
    horarioMock
  ]);

  horariosPresenter.formatearHorario.mockReturnValue(horarioFormateadoMock);

  const resultado = await obtenerHorarioFormateadoPorCodigo("d2");

  expect(resultado).toEqual(horarioFormateadoMock);
  expect(horariosPresenter.formatearHorario).toHaveBeenCalledWith(horarioMock);
});
test("debería devolver undefined si no existe el horario a formatear por código", async () => {
  horariosRepository.getAllHorarios.mockResolvedValue([
    { codigo: "d1", nombre_distrito: "Distrito 1" }
  ]);

  const resultado = await obtenerHorarioFormateadoPorCodigo("d99");

  expect(resultado).toBeUndefined();
  expect(horariosPresenter.formatearHorario).not.toHaveBeenCalled();
});
  
});