const reportesController = require("../controller/reportes.controller");
const reportesFactory = require("../../../bootstrap/reportesFactory");

jest.mock("../../../bootstrap/reportesFactory");

describe("reportes.controller", () => {
  let req;
  let res;
    let consoleErrorSpy;

beforeEach(() => {
  req = { query: {}, body: {} };
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  jest.clearAllMocks();
});

afterEach(() => {
  consoleErrorSpy.mockRestore();
});

  test("debe obtener todos los reportes si no se envía usuario_id", async () => {
    const reportes = [{ id: 1, descripcion: "Basura", usuario_id: 2 }];

    reportesFactory.obtenerReportes.mockResolvedValue(reportes);

    await reportesController.obtenerReportes(req, res);

    expect(reportesFactory.obtenerReportes).toHaveBeenCalled();
    expect(reportesFactory.obtenerReportesPorUsuario).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(reportes);
  });

    test("debe obtener reportes por usuario si se envía usuario_id", async () => {
    const reportes = [{ id: 1, descripcion: "Basura", usuario_id: 2 }];

    req.query.usuario_id = "2";
    reportesFactory.obtenerReportesPorUsuario.mockResolvedValue(reportes);

    await reportesController.obtenerReportes(req, res);

    expect(reportesFactory.obtenerReportesPorUsuario).toHaveBeenCalledWith(2);
    expect(reportesFactory.obtenerReportes).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(reportes);
  });

  test("debe responder con 500 si ocurre un error al obtener reportes", async () => {
    reportesFactory.obtenerReportes.mockRejectedValue(new Error("Error interno"));

    await reportesController.obtenerReportes(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "No se pudieron obtener los reportes."
    });
  });


    test("debe responder con una lista vacía si no hay reportes por usuario", async () => {
    req.query.usuario_id = "2";
    reportesFactory.obtenerReportesPorUsuario.mockResolvedValue([]);

    await reportesController.obtenerReportes(req, res);

    expect(reportesFactory.obtenerReportesPorUsuario).toHaveBeenCalledWith(2);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
    });

    test("debe convertir usuario_id a número antes de consultar reportes por usuario", async () => {
    req.query.usuario_id = "2";
    reportesFactory.obtenerReportesPorUsuario.mockResolvedValue([]);

    await reportesController.obtenerReportes(req, res);

    expect(reportesFactory.obtenerReportesPorUsuario).toHaveBeenCalledWith(2);
    });

});