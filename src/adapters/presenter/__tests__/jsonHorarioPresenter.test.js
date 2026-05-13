const jsonHorarioPresenter = require('../jsonHorarioPresenter');

describe('jsonHorarioPresenter adapter', () => {
  test('exporta formatearHorario como función', () => {
    expect(typeof jsonHorarioPresenter.formatearHorario).toBe('function');
  });

  test('exporta formatearHorarios como función', () => {
    expect(typeof jsonHorarioPresenter.formatearHorarios).toBe('function');
  });
});
