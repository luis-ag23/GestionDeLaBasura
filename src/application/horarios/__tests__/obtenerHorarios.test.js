const obtenerHorarios = require('../obtenerHorarios');

describe('obtenerHorarios use-case', () => {
  test('devuelve todos los horarios', async () => {
    const mockRepo = {
      getAllHorarios: jest.fn().mockResolvedValue([
        { id: '1', codigo: 'd1', nombre_distrito: 'Distrito 1' },
        { id: '2', codigo: 'd2', nombre_distrito: 'Distrito 2' }
      ])
    };

    const result = await obtenerHorarios({ horarioRepo: mockRepo });

    expect(mockRepo.getAllHorarios).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0].codigo).toBe('d1');
  });

  test('devuelve array vacío si no hay horarios', async () => {
    const mockRepo = {
      getAllHorarios: jest.fn().mockResolvedValue([])
    };

    const result = await obtenerHorarios({ horarioRepo: mockRepo });

    expect(result).toEqual([]);
  });
});
