const obtenerReportesPorUsuario = require('../obtenerReportesPorUsuario');

describe('obtenerReportesPorUsuario use-case', () => {
  test('devuelve reportes formateados del usuario', async () => {
    const mockRepo = {
      getReportesByUsuarioId: jest.fn().mockResolvedValue([
        { id: 1, usuario_id: 5, descripcion: 'Basura en calle', ubicacion: 'Calle Principal', created_at: '2026-05-01' },
        { id: 2, usuario_id: 5, descripcion: 'Contenedor roto', ubicacion: 'Parque Central', created_at: '2026-05-02' }
      ])
    };

    const mockPresenter = {
      formatearReportes: jest.fn(reportes => 
        reportes.map(r => ({ ...r, estado: 'pendiente' }))
      )
    };

    const result = await obtenerReportesPorUsuario({ reporteRepo: mockRepo, reportePresenter: mockPresenter }, 5);

    expect(mockRepo.getReportesByUsuarioId).toHaveBeenCalledWith(5);
    expect(mockPresenter.formatearReportes).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0].estado).toBe('pendiente');
  });

  test('devuelve array vacío si el usuario no tiene reportes', async () => {
    const mockRepo = {
      getReportesByUsuarioId: jest.fn().mockResolvedValue([])
    };

    const mockPresenter = {
      formatearReportes: jest.fn(reportes => reportes)
    };

    const result = await obtenerReportesPorUsuario({ reporteRepo: mockRepo, reportePresenter: mockPresenter }, 99);

    expect(result).toEqual([]);
  });
});
