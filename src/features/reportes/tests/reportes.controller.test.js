const reportesController = require("../controller/reportes.controller");
const reportesService = require("../services/reportes.service");

jest.mock("../services/reportes.service");

describe("reportes.controller", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      query: {},
      body: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  test("debe obtener todos los reportes si no se envía usuario_id", async () => {
    const reportes = [{ id: 1, descripcion: "Basura", usuario_id: 2 }];

    reportesService.obtenerReportes.mockResolvedValue(reportes);

    await reportesController.obtenerReportes(req, res);

    expect(reportesService.obtenerReportes).toHaveBeenCalled();
    expect(reportesService.obtenerReportesPorUsuario).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(reportes);
  });

    test("debe obtener reportes por usuario si se envía usuario_id", async () => {
    const reportes = [{ id: 1, descripcion: "Basura", usuario_id: 2 }];

    req.query.usuario_id = "2";
    reportesService.obtenerReportesPorUsuario.mockResolvedValue(reportes);

    await reportesController.obtenerReportes(req, res);

    expect(reportesService.obtenerReportesPorUsuario).toHaveBeenCalledWith(2);
    expect(reportesService.obtenerReportes).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(reportes);
  });

  test("debe responder con 500 si ocurre un error al obtener reportes", async () => {
    reportesService.obtenerReportes.mockRejectedValue(new Error("Error interno"));

    await reportesController.obtenerReportes(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "No se pudieron obtener los reportes."
    });
  });


    test("debe responder con una lista vacía si no hay reportes por usuario", async () => {
    req.query.usuario_id = "2";
    reportesService.obtenerReportesPorUsuario.mockResolvedValue([]);

    await reportesController.obtenerReportes(req, res);

    expect(reportesService.obtenerReportesPorUsuario).toHaveBeenCalledWith(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
    });

});