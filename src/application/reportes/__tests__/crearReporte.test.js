const crearReporte = require('../crearReporte');

describe('crearReporte use-case', () => {
  test('crea y formatea un reporte', async () => {
    const mockRepo = {
      createReporte: jest.fn().mockResolvedValue({
        id: 1,
        descripcion: 'Basura acumulada',
        ubicacion: 'Zona norte',
        imagen_url: null,
        estado: 'pendiente',
        usuario_id: 2,
        created_at: new Date().toISOString()
      })
    };

    const mockPresenter = {
      formatearReporte: jest.fn(reporte => reporte)
    };

    const resultado = await crearReporte(
      { reporteRepo: mockRepo, reportePresenter: mockPresenter },
      {
        descripcion: '  Basura acumulada  ',
        ubicacion: '  Zona norte  ',
        imagen_url: '',
        usuario_id: '2'
      }
    );

    expect(mockRepo.createReporte).toHaveBeenCalledWith({
      descripcion: 'Basura acumulada',
      ubicacion: 'Zona norte',
      imagen_url: null,
      usuario_id: 2
    });
    expect(mockPresenter.formatearReporte).toHaveBeenCalled();
    expect(resultado.descripcion).toBe('Basura acumulada');
  });

  test('lanza error si falta descripcion', async () => {
    await expect(
      crearReporte(
        { reporteRepo: {}, reportePresenter: {} },
        { descripcion: '', ubicacion: 'Zona norte', imagen_url: null, usuario_id: 2 }
      )
    ).rejects.toThrow('La descripción es obligatoria.');
  });

  test('lanza error si falta ubicacion', async () => {
    await expect(
      crearReporte(
        { reporteRepo: {}, reportePresenter: {} },
        { descripcion: 'Basura', ubicacion: '  ', imagen_url: null, usuario_id: 2 }
      )
    ).rejects.toThrow('La ubicación es obligatoria.');
  });
});
