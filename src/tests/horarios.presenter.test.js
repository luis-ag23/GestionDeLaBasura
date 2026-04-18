const { formatearHorario } = require("../presenters/horarios.presenter");

describe("horarios.presenter", () => {
  test("debería transformar un horario al formato esperado por la UI", () => {
    const horario = {
      codigo: "d1",
      nombre_distrito: "Distrito 1",
      zona: "Centro Histórico",
      turno: "Tarde",
      hora_inicio: "16:00:00",
      hora_fin: "00:00:00",
      dias: ["Lunes", "Miércoles", "Viernes"],
      tipo_servicio: "contenedor",
      nota: "Zona central con contenedores soterrados.",
      color: "azul"
    };

    const resultado = formatearHorario(horario);

    expect(resultado).toEqual({
      codigo: "d1",
      titulo: "Distrito 1",
      subtitulo: "Centro Histórico",
      turno: "Tarde",
      horarioTexto: "16:00 - 00:00",
      tipoLabel: "Contenedor",
      dias: ["Lunes", "Miércoles", "Viernes"],
      nota: "Zona central con contenedores soterrados.",
      color: "azul"
    });
  });
});