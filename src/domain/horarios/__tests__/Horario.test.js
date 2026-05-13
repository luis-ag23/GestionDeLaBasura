const crearHorario = require('../Horario');

describe('Horario domain entity', () => {
  test('crea una entidad horario correctamente', () => {
    const datos = {
      id: '1',
      codigo: 'd1',
      nombre_distrito: 'Distrito 1',
      zona: 'Centro',
      turno: 'Tarde',
      hora_inicio: '16:00:00',
      hora_fin: '00:00:00',
      dias: ['Lunes', 'Viernes'],
      tipo_servicio: 'contenedor',
      nota: 'Centro histórico',
      color: 'azul'
    };

    const horario = new crearHorario(datos);

    expect(horario.codigo).toBe('d1');
    expect(horario.nombre_distrito).toBe('Distrito 1');
    expect(horario.dias).toHaveLength(2);
  });
});
