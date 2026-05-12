const obtenerUsuarios = require('../../obtenerUsuarios');

describe('obtenerUsuarios use-case', () => {
  test('devuelve usuarios formateados', async () => {
    const mockRepo = {
      getAllUsuarios: jest.fn().mockResolvedValue([
        { id: 1, nombre: 'Ana', correo: 'a@a.com', rol: 'usuario', created_at: new Date().toISOString() }
      ])
    };

    const mockPresenter = {
      formatearUsuario: jest.fn(u => u)
    };

    const result = await obtenerUsuarios({ usuarioRepo: mockRepo, usuarioPresenter: mockPresenter });

    expect(mockRepo.getAllUsuarios).toHaveBeenCalled();
    expect(mockPresenter.formatearUsuario).toHaveBeenCalled();
    expect(result).toEqual([{ id: 1, nombre: 'Ana', correo: 'a@a.com', rol: 'usuario', created_at: expect.any(String) }]);
  });
});
