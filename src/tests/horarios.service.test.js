const horariosRepository = require("../db/horarios.repository");
const {
  obtenerHorarios,
  obtenerHorarioPorCodigo,
  obtenerHorariosPorDia,
  obtenerHorariosDeHoy
} = require("../services/horarios.service");

jest.mock("../db/horarios.repository");

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
