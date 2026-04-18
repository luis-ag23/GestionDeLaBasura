const horariosRepository = require("../db/horarios.repository");
const { obtenerHorarios, obtenerHorarioPorCodigo } = require("../services/horarios.service");

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