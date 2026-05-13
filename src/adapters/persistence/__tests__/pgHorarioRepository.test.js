const pgHorarioRepository = require('../pgHorarioRepository');

describe('pgHorarioRepository adapter', () => {
  test('exporta getAllHorarios como función', () => {
    expect(typeof pgHorarioRepository.getAllHorarios).toBe('function');
  });

  test('getAllHorarios es una función async', () => {
    const result = pgHorarioRepository.getAllHorarios();
    expect(result instanceof Promise).toBe(true);
  });
});
