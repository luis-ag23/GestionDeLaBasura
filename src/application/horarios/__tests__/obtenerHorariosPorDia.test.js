const obtenerHorariosPorDia = require('../obtenerHorariosPorDia');

describe('obtenerHorariosPorDia use-case', () => {
  test('devuelve horarios que incluyen un día específico', async () => {
    const mockRepo = {
      getAllHorarios: jest.fn().mockResolvedValue([
        { id: '1', codigo: 'd1', dias: ['Lunes', 'Miércoles', 'Viernes'] },
        { id: '2', codigo: 'd2', dias: ['Martes', 'Jueves', 'Sábado'] },
        { id: '3', codigo: 'd3', dias: ['Lunes', 'Miércoles', 'Sábado'] }
      ])
    };

    const result = await obtenerHorariosPorDia({ horarioRepo: mockRepo }, 'Lunes');

    expect(result).toHaveLength(2);
    expect(result[0].codigo).toBe('d1');
    expect(result[1].codigo).toBe('d3');
  });

  test('devuelve array vacío si ningún horario incluye el día', async () => {
    const mockRepo = {
      getAllHorarios: jest.fn().mockResolvedValue([
        { id: '1', codigo: 'd1', dias: ['Lunes', 'Miércoles'] }
      ])
    };

    const result = await obtenerHorariosPorDia({ horarioRepo: mockRepo }, 'Domingo');

    expect(result).toEqual([]);
  });

  test('maneja horarios sin array de días', async () => {
    const mockRepo = {
      getAllHorarios: jest.fn().mockResolvedValue([
        { id: '1', codigo: 'd1' },
        { id: '2', codigo: 'd2', dias: ['Lunes'] }
      ])
    };

    const result = await obtenerHorariosPorDia({ horarioRepo: mockRepo }, 'Lunes');

    expect(result).toHaveLength(1);
    expect(result[0].codigo).toBe('d2');
  });
});
