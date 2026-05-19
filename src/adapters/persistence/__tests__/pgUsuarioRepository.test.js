const pgUsuarioRepository = require('../pgUsuarioRepository');
const pool = require('../../../../db');

jest.mock('../../../../db', () => ({
  query: jest.fn()
}));

describe('pgUsuarioRepository adapter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('exporta getAllUsuarios como función', () => {
    expect(typeof pgUsuarioRepository.getAllUsuarios).toBe('function');
  });

  test('exporta getUsuarioByCorreo como función', () => {
    expect(typeof pgUsuarioRepository.getUsuarioByCorreo).toBe('function');
  });

  test('exporta createUsuario como función', () => {
    expect(typeof pgUsuarioRepository.createUsuario).toBe('function');
  });
  describe('Manejo de Errores de Base de Datos', () => {
    
    test('createUsuario debe lanzar error genérico si falla la BD', async () => {
      // Simulamos un error cualquiera de conexión o sintaxis en SQL
      pool.query.mockRejectedValue(new Error('Connection failed'));

      await expect(pgUsuarioRepository.createUsuario({ 
        nombre: 'Ana', correo: 'a@a.com', password_hash: 'hash', rol: 'usuario' 
      })).rejects.toThrow('Error en base de datos al crear el usuario.');
    });

    test('createUsuario debe lanzar error específico si hay duplicado (Código 23505)', async () => {
      // Simulamos el error exacto que arroja PostgreSQL al violar un UNIQUE CONSTRAINT
      const dbError = new Error('duplicate key value violates unique constraint');
      dbError.code = '23505'; 
      pool.query.mockRejectedValue(dbError);

      await expect(pgUsuarioRepository.createUsuario({ 
        nombre: 'Ana', correo: 'a@a.com', password_hash: 'hash', rol: 'usuario' 
      })).rejects.toThrow('El correo ya está registrado.');
    });

    test('getUsuarioByCorreo debe retornar null y no fallar si no encuentra nada', async () => {
      // Simulamos una consulta exitosa pero sin resultados
      pool.query.mockResolvedValue({ rows: [] });

      const resultado = await pgUsuarioRepository.getUsuarioByCorreo('noexiste@a.com');
      
      expect(resultado).toBeNull();
      expect(pool.query).toHaveBeenCalledTimes(1);
    });

  });
});
