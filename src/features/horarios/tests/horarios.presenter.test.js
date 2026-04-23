const {
  formatearHorario,
  formatearHorarios,
  construirHorarioTexto,
  pasaHoy
} = require("../presenter/horarios.presenter");

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
      color: "azul",
      pasaHoy: false
    });
  });
});
test("debería mostrar tipoLabel como Domiciliario cuando el tipo de servicio es domiciliario", () => {
  const horario = {
    codigo: "d2",
    nombre_distrito: "Distrito 2",
    zona: "Queru Queru / Sarco",
    turno: "Mañana",
    hora_inicio: "06:00:00",
    hora_fin: "14:00:00",
    dias: ["Lunes", "Miércoles", "Sábado"],
    tipo_servicio: "domiciliario",
    nota: "Servicio domiciliario regular.",
    color: "verde"
  };

  const resultado = formatearHorario(horario);

  expect(resultado.tipoLabel).toBe("Domiciliario");
});

test("debería transformar una lista de horarios al formato esperado por la UI", () => {
  const horarios = [
    {
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
    },
    {
      codigo: "d2",
      nombre_distrito: "Distrito 2",
      zona: "Queru Queru / Sarco",
      turno: "Mañana",
      hora_inicio: "06:00:00",
      hora_fin: "14:00:00",
      dias: ["Lunes", "Miércoles", "Sábado"],
      tipo_servicio: "domiciliario",
      nota: "Servicio domiciliario regular.",
      color: "verde"
    }
  ];

  const resultado = formatearHorarios(horarios);

  expect(resultado).toEqual([
    {
      codigo: "d1",
      titulo: "Distrito 1",
      subtitulo: "Centro Histórico",
      turno: "Tarde",
      horarioTexto: "16:00 - 00:00",
      tipoLabel: "Contenedor",
      dias: ["Lunes", "Miércoles", "Viernes"],
      nota: "Zona central con contenedores soterrados.",
      color: "azul",
      pasaHoy: false
    },
    {
      codigo: "d2",
      titulo: "Distrito 2",
      subtitulo: "Queru Queru / Sarco",
      turno: "Mañana",
      horarioTexto: "06:00 - 14:00",
      tipoLabel: "Domiciliario",
      dias: ["Lunes", "Miércoles", "Sábado"],
      nota: "Servicio domiciliario regular.",
      color: "verde",
      pasaHoy: false
    }
  ]);
});
test("debería construir el texto de horario a partir de hora_inicio y hora_fin", () => {
  const resultado = construirHorarioTexto("06:00:00", "14:00:00");

  expect(resultado).toBe("06:00 - 14:00");
});
test("debería indicar true si el horario incluye el día actual", () => {
  const dias = ["Lunes", "Miércoles", "Viernes"];

  const resultado = pasaHoy(dias, "Lunes");

  expect(resultado).toBe(true);
});

test("debería indicar false si el horario no incluye el día actual", () => {
  const dias = ["Martes", "Jueves", "Sábado"];

  const resultado = pasaHoy(dias, "Lunes");

  expect(resultado).toBe(false);
});
test("debería incluir pasaHoy en el horario formateado cuando se envía el día actual", () => {
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

  const resultado = formatearHorario(horario, "Lunes");

  expect(resultado.pasaHoy).toBe(true);
});
