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