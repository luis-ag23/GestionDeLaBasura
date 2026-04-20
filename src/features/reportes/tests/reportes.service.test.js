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