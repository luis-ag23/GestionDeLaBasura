const pgReporteRepository = require('../pgReporteRepository');

describe('pgReporteRepository adapter', () => {
  test('exporta getAllReportes como función', () => {
    expect(typeof pgReporteRepository.getAllReportes).toBe('function');
  });

  test('exporta getReportesByUsuarioId como función', () => {
    expect(typeof pgReporteRepository.getReportesByUsuarioId).toBe('function');
  });

  test('exporta createReporte como función', () => {
    expect(typeof pgReporteRepository.createReporte).toBe('function');
  });
});
