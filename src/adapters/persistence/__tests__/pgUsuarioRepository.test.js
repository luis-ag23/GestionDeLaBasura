const pgUsuarioRepository = require('../pgUsuarioRepository');

describe('pgUsuarioRepository adapter', () => {
  test('exporta getAllUsuarios como función', () => {
    expect(typeof pgUsuarioRepository.getAllUsuarios).toBe('function');
  });

  test('exporta getUsuarioByCorreo como función', () => {
    expect(typeof pgUsuarioRepository.getUsuarioByCorreo).toBe('function');
  });

  test('exporta createUsuario como función', () => {
    expect(typeof pgUsuarioRepository.createUsuario).toBe('function');
  });
});
