const crearReporte = require('../Reporte');

describe('Reporte domain entity', () => {
  test('crea una entidad reporte correctamente', () => {
    const datos = {
      id: 1,
      descripcion: 'Basura en calle',
      ubicacion: 'Calle Principal',
      usuario_id: 1,
      estado: 'pendiente',
      created_at: '2026-05-12T10:00:00Z'
    };

    const reporte = new crearReporte(datos);

    expect(reporte.descripcion).toBe('Basura en calle');
    expect(reporte.ubicacion).toBe('Calle Principal');
    expect(reporte.usuario_id).toBe(1);
  });
});
