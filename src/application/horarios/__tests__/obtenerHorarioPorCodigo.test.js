const obtenerHorarioPorCodigo = require('../obtenerHorarioPorCodigo');

describe('obtenerHorarioPorCodigo use-case', () => {
  test('devuelve un horario por su código', async () => {
    const mockRepo = {
      getAllHorarios: jest.fn().mockResolvedValue([
        { id: '1', codigo: 'd1', nombre_distrito: 'Distrito 1' },
        { id: '2', codigo: 'd2', nombre_distrito: 'Distrito 2' }
      ])
    };

    const result = await obtenerHorarioPorCodigo({ horarioRepo: mockRepo }, 'd2');

    expect(result.codigo).toBe('d2');
    expect(result.nombre_distrito).toBe('Distrito 2');
  });

  test('devuelve undefined si el código no existe', async () => {
    const mockRepo = {
      getAllHorarios: jest.fn().mockResolvedValue([
        { id: '1', codigo: 'd1', nombre_distrito: 'Distrito 1' }
      ])
    };

    const result = await obtenerHorarioPorCodigo({ horarioRepo: mockRepo }, 'd99');

    expect(result).toBeUndefined();
  });

  test('devuelve undefined si no hay horarios', async () => {
    const mockRepo = {
      getAllHorarios: jest.fn().mockResolvedValue([])
    };

    const result = await obtenerHorarioPorCodigo({ horarioRepo: mockRepo }, 'd1');

    expect(result).toBeUndefined();
  });
});
