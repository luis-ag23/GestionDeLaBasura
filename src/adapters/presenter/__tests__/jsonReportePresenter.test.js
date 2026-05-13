const jsonReportePresenter = require('../jsonReportePresenter');

describe('jsonReportePresenter adapter', () => {
  test('exporta formatearReporte como función', () => {
    expect(typeof jsonReportePresenter.formatearReporte).toBe('function');
  });

  test('exporta formatearReportes como función', () => {
    expect(typeof jsonReportePresenter.formatearReportes).toBe('function');
  });
});
