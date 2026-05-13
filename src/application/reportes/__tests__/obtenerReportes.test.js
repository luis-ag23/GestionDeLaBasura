const obtenerReportes = require('../obtenerReportes');
const obtenerReportesPorUsuario = require('../obtenerReportesPorUsuario');

describe('reportes use-cases', () => {
  test('obtiene y formatea todos los reportes', async () => {
    const mockRepo = {
      getAllReportes: jest.fn().mockResolvedValue([{ id: 1, descripcion: 'Basura', usuario_id: 2 }])
    };

    const mockPresenter = {
      formatearReportes: jest.fn(reportes => reportes)
    };

    const resultado = await obtenerReportes({ reporteRepo: mockRepo, reportePresenter: mockPresenter });

    expect(mockRepo.getAllReportes).toHaveBeenCalled();
    expect(mockPresenter.formatearReportes).toHaveBeenCalledWith([{ id: 1, descripcion: 'Basura', usuario_id: 2 }]);
    expect(resultado).toEqual([{ id: 1, descripcion: 'Basura', usuario_id: 2 }]);
  });

  test('obtiene reportes por usuario y los formatea', async () => {
    const mockRepo = {
      getReportesByUsuarioId: jest.fn().mockResolvedValue([{ id: 1, descripcion: 'Basura', usuario_id: 2 }])
    };

    const mockPresenter = {
      formatearReportes: jest.fn(reportes => reportes)
    };

    const resultado = await obtenerReportesPorUsuario({ reporteRepo: mockRepo, reportePresenter: mockPresenter }, 2);

    expect(mockRepo.getReportesByUsuarioId).toHaveBeenCalledWith(2);
    expect(mockPresenter.formatearReportes).toHaveBeenCalledWith([{ id: 1, descripcion: 'Basura', usuario_id: 2 }]);
    expect(resultado).toEqual([{ id: 1, descripcion: 'Basura', usuario_id: 2 }]);
  });
});
