const reportesPresenter = require("../presenter/reportes.presenter");

test("debe formatear un reporte correctamente", () => {
  const reporte = {
    id: 1,
    descripcion: "Basura acumulada",
    ubicacion: "Zona norte",
    imagen_url: null,
    estado: "pendiente",
    usuario_id: 2,
    created_at: "2026-04-20T10:00:00.000Z"
  };

  const resultado = reportesPresenter.formatearReporte(reporte);

  expect(resultado).toEqual({
    id: 1,
    descripcion: "Basura acumulada",
    ubicacion: "Zona norte",
    imagen_url: null,
    estado: "pendiente",
    usuario_id: 2,
    created_at: new Date("2026-04-20T10:00:00.000Z").toISOString()
  });
});

test('debe poner "pendiente" si estado no existe', () => {
  const reporte = {
    id: 1,
    descripcion: "Basura acumulada",
    ubicacion: "Zona norte",
    imagen_url: null,
    estado: null,
    usuario_id: 2,
    created_at: "2026-04-20T10:00:00.000Z"
  };

  const resultado = reportesPresenter.formatearReporte(reporte);

  expect(resultado.estado).toBe("pendiente");
});

test("debe devolver null en created_at si no hay fecha", () => {
  const reporte = {
    id: 1,
    descripcion: "Basura acumulada",
    ubicacion: "Zona norte",
    imagen_url: null,
    estado: "pendiente",
    usuario_id: 2,
    created_at: null
  };

  const resultado = reportesPresenter.formatearReporte(reporte);

  expect(resultado.created_at).toBeNull();
});


test("debe formatear una lista de reportes", () => {
  const reportes = [
    {
      id: 1,
      descripcion: "Basura 1",
      ubicacion: "Zona 1",
      imagen_url: null,
      estado: "pendiente",
      usuario_id: 2,
      created_at: "2026-04-20T10:00:00.000Z"
    },
    {
      id: 2,
      descripcion: "Basura 2",
      ubicacion: "Zona 2",
      imagen_url: null,
      estado: "resuelto",
      usuario_id: 3,
      created_at: "2026-04-20T11:00:00.000Z"
    }
  ];

  const resultado = reportesPresenter.formatearReportes(reportes);

  expect(resultado).toHaveLength(2);
  expect(resultado[0].id).toBe(1);
  expect(resultado[1].id).toBe(2);
});