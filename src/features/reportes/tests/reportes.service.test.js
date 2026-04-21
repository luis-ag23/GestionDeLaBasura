const reportesService = require("../services/reportes.service");
const reportesRepository = require("../repository/reportes.repository");
const reportesPresenter = require("../presenter/reportes.presenter");

jest.mock("../repository/reportes.repository");
jest.mock("../presenter/reportes.presenter");

test("debe obtener y formatear todos los reportes", async () => {
  const reportes = [
    { id: 1, descripcion: "Basura", ubicacion: "Zona norte" }
  ];

  const reportesFormateados = [
    { id: 1, descripcion: "Basura", ubicacion: "Zona norte", estado: "pendiente" }
  ];

  reportesRepository.getAllReportes.mockResolvedValue(reportes);
  reportesPresenter.formatearReportes.mockReturnValue(reportesFormateados);

  const resultado = await reportesService.obtenerReportes();

  expect(reportesRepository.getAllReportes).toHaveBeenCalled();
  expect(reportesPresenter.formatearReportes).toHaveBeenCalledWith(reportes);
  expect(resultado).toEqual(reportesFormateados);
});

test("debe aplicar trim a descripción y ubicación", async () => {
  const datosEntrada = {
    descripcion: "   Basura acumulada   ",
    ubicacion: "   Zona norte   ",
    imagen_url: "",
    usuario_id: "2"
  };

  const reporteGuardado = {
    id: 1,
    descripcion: "Basura acumulada",
    ubicacion: "Zona norte",
    imagen_url: null,
    estado: "pendiente",
    usuario_id: 2,
    created_at: "2026-04-20T10:00:00.000Z"
  };

  reportesRepository.createReporte.mockResolvedValue(reporteGuardado);
  reportesPresenter.formatearReporte.mockReturnValue(reporteGuardado);

  await reportesService.crearReporte(datosEntrada);

  expect(reportesRepository.createReporte).toHaveBeenCalledWith({
    descripcion: "Basura acumulada",
    ubicacion: "Zona norte",
    imagen_url: null,
    usuario_id: 2
  });
});


test("debe lanzar error si falta descripción", async () => {
  await expect(
    reportesService.crearReporte({
      descripcion: "",
      ubicacion: "Zona norte",
      imagen_url: null,
      usuario_id: 2
    })
  ).rejects.toThrow("La descripción es obligatoria.");
});


test("debe lanzar error si falta ubicación", async () => {
  await expect(
    reportesService.crearReporte({
      descripcion: "Basura",
      ubicacion: "",
      imagen_url: null,
      usuario_id: 2
    })
  ).rejects.toThrow("La ubicación es obligatoria.");
});

test("debe obtener y formatear los reportes de un usuario específico", async () => {
  const usuarioId = 2;

  const reportes = [
    { id: 1, descripcion: "Basura", ubicacion: "Zona norte", usuario_id: 2 },
    { id: 2, descripcion: "Escombros", ubicacion: "Centro", usuario_id: 2 }
  ];

  const reportesFormateados = [
    { id: 1, descripcion: "Basura", ubicacion: "Zona norte", estado: "pendiente", usuario_id: 2 },
    { id: 2, descripcion: "Escombros", ubicacion: "Centro", estado: "resuelto", usuario_id: 2 }
  ];

  reportesRepository.getReportesByUsuarioId.mockResolvedValue(reportes);
  reportesPresenter.formatearReportes.mockReturnValue(reportesFormateados);

  const resultado = await reportesService.obtenerReportesPorUsuario(usuarioId);

  expect(reportesRepository.getReportesByUsuarioId).toHaveBeenCalledWith(usuarioId);
  expect(reportesPresenter.formatearReportes).toHaveBeenCalledWith(reportes);
  expect(resultado).toEqual(reportesFormateados);
});

test("debe incluir el estado en los reportes obtenidos", async () => {
  const reportes = [
    {
      id: 1,
      descripcion: "Basura",
      ubicacion: "Zona norte",
      estado: "pendiente"
    }
  ];

  const reportesFormateados = [
    {
      id: 1,
      descripcion: "Basura",
      ubicacion: "Zona norte",
      estado: "pendiente"
    }
  ];

  reportesRepository.getAllReportes.mockResolvedValue(reportes);
  reportesPresenter.formatearReportes.mockReturnValue(reportesFormateados);

  const resultado = await reportesService.obtenerReportes();

  expect(resultado[0]).toHaveProperty("estado");
  expect(resultado[0].estado).toBe("pendiente");
});

test("debe incluir el estado en los reportes obtenidos", async () => {
  const reportes = [
    {
      id: 1,
      descripcion: "Basura",
      ubicacion: "Zona norte",
      estado: "pendiente"
    }
  ];

  const reportesFormateados = [
    {
      id: 1,
      descripcion: "Basura",
      ubicacion: "Zona norte",
      estado: "pendiente"
    }
  ];

  reportesRepository.getAllReportes.mockResolvedValue(reportes);
  reportesPresenter.formatearReportes.mockReturnValue(reportesFormateados);

  const resultado = await reportesService.obtenerReportes();

  expect(resultado[0]).toHaveProperty("estado");
  expect(resultado[0].estado).toBe("pendiente");
});