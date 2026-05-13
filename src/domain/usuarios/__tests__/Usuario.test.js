const crearUsuario = require('../Usuario');

describe('Usuario domain entity', () => {
  test('crea una entidad usuario correctamente', () => {
    const datos = {
      id: 1,
      nombre: 'Ana',
      correo: 'ana@example.com',
      rol: 'usuario',
      created_at: '2026-05-12T10:00:00Z'
    };

    const usuario = new crearUsuario(datos);

    expect(usuario.nombre).toBe('Ana');
    expect(usuario.correo).toBe('ana@example.com');
    expect(usuario.rol).toBe('usuario');
  });

  test('Usuario tiene método toPlain', () => {
    const usuario = new crearUsuario({
      id: 1,
      nombre: 'Bob',
      correo: 'bob@example.com',
      rol: 'admin',
      created_at: '2026-05-12'
    });

    const plain = usuario.toPlain();

    expect(typeof plain).toBe('object');
    expect(plain.nombre).toBe('Bob');
  });
});
