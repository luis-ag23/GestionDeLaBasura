const crearUsuario = require('../crearUsuario');

describe('crearUsuario use-case', () => {
  
  test('crea usuario correctamente', async () => {
    const mockRepo = {
      getUsuarioByCorreo: jest.fn().mockResolvedValue(null),
      createUsuario: jest.fn().mockResolvedValue({ id: 1, nombre: 'Ana', correo: 'a@a.com', rol: 'usuario', created_at: new Date().toISOString() })
    };

    const mockHashService = {
      genSalt: jest.fn().mockResolvedValue('salt'),
      hash: jest.fn().mockResolvedValue('hash')
    };

    const mockPresenter = {
      formatearUsuario: jest.fn(u => u)
    };

    const datos = { nombre: 'Ana', correo: 'a@a.com', password: 'secreto' };

    const result = await crearUsuario({ usuarioRepo: mockRepo, hashService: mockHashService, usuarioPresenter: mockPresenter }, datos);

    expect(mockRepo.getUsuarioByCorreo).toHaveBeenCalledWith('a@a.com');
    expect(mockHashService.genSalt).toHaveBeenCalled();
    expect(mockRepo.createUsuario).toHaveBeenCalled();
    expect(mockPresenter.formatearUsuario).toHaveBeenCalled();
    expect(result).toEqual({ id: 1, nombre: 'Ana', correo: 'a@a.com', rol: 'usuario', created_at: expect.any(String) });
  });

  test('lanza error si falta el nombre o está vacío', async () => {
    const mockRepo = {};
    const mockHashService = {};
    const mockPresenter = {};
    const dependencias = { usuarioRepo: mockRepo, hashService: mockHashService, usuarioPresenter: mockPresenter };

    await expect(crearUsuario(dependencias, { correo: 'a@a.com', password: 'x' }))
      .rejects.toThrow('El nombre es obligatorio.');

    await expect(crearUsuario(dependencias, { nombre: '    ', correo: 'a@a.com', password: 'x' }))
      .rejects.toThrow('El nombre es obligatorio.');
  });

  test('lanza error si falta el correo o está vacío', async () => {
    const mockRepo = {};
    const mockHashService = {};
    const mockPresenter = {};
    const dependencias = { usuarioRepo: mockRepo, hashService: mockHashService, usuarioPresenter: mockPresenter };

    await expect(crearUsuario(dependencias, { nombre: 'Ana', password: 'x' }))
      .rejects.toThrow('El correo es obligatorio.');

    await expect(crearUsuario(dependencias, { nombre: 'Ana', correo: '    ', password: 'x' }))
      .rejects.toThrow('El correo es obligatorio.');
  });

  test('limpia los espacios extra (trim) antes de consultar y guardar en la base de datos', async () => {
    const mockRepo = {
      getUsuarioByCorreo: jest.fn().mockResolvedValue(null),
      createUsuario: jest.fn().mockResolvedValue({ id: 1, nombre: 'Ana', correo: 'a@a.com', rol: 'usuario' })
    };
    const mockHashService = {
      genSalt: jest.fn().mockResolvedValue('salt'),
      hash: jest.fn().mockResolvedValue('hash')
    };
    const mockPresenter = {
      formatearUsuario: jest.fn(u => u)
    };

    const datosSucios = { nombre: '   Ana   ', correo: '   a@a.com   ', password: 'secreto' };

    await crearUsuario({ usuarioRepo: mockRepo, hashService: mockHashService, usuarioPresenter: mockPresenter }, datosSucios);

    expect(mockRepo.getUsuarioByCorreo).toHaveBeenCalledWith('a@a.com');
    expect(mockRepo.createUsuario).toHaveBeenCalledWith(expect.objectContaining({
      nombre: 'Ana',
      correo: 'a@a.com'
    }));
  });

  test('lanza error si falta password', async () => {
    const mockRepo = {};
    const mockHashService = {};
    const mockPresenter = {};

    await expect(crearUsuario({ usuarioRepo: mockRepo, hashService: mockHashService, usuarioPresenter: mockPresenter }, { nombre: 'Ana', correo: 'a@a.com' })).rejects.toThrow('La contraseña es obligatoria.');
  });

  test('lanza error si correo ya existe', async () => {
    const mockRepo = {
      getUsuarioByCorreo: jest.fn().mockResolvedValue({ id: 2 })
    };
    const mockHashService = {};
    const mockPresenter = {};

    await expect(crearUsuario({ usuarioRepo: mockRepo, hashService: mockHashService, usuarioPresenter: mockPresenter }, { nombre: 'Ana', correo: 'a@a.com', password: 'x' })).rejects.toThrow('El correo ya está registrado.');
  });
});