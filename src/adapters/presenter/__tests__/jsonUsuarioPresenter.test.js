const jsonUsuarioPresenter = require('../jsonUsuarioPresenter');

describe('jsonUsuarioPresenter adapter', () => {
  test('exporta formatearUsuario como función', () => {
    expect(typeof jsonUsuarioPresenter.formatearUsuario).toBe('function');
  });

  test('formatearUsuario remueve password_hash', () => {
    const usuario = {
      id: 1,
      nombre: 'Ana',
      correo: 'ana@a.com',
      password_hash: 'secret123',
      rol: 'usuario',
      created_at: '2026-05-12T10:00:00Z'
    };

    const result = jsonUsuarioPresenter.formatearUsuario(usuario);

    expect(result).not.toHaveProperty('password_hash');
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('nombre');
    expect(result).toHaveProperty('created_at');
  });
});
