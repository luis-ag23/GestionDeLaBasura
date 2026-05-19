const autenticarUsuario = require("../autenticarUsuario");

describe("Caso de Uso: autenticarUsuario", () => {
  let mockRepo, mockHashService, mockTokenService, mockPresenter, dependencias;

  beforeEach(() => {
    mockRepo = { getUsuarioByCorreo: jest.fn() };
    mockHashService = { compare: jest.fn() };
    mockTokenService = { generarToken: jest.fn() };
    mockPresenter = { formatearUsuario: jest.fn(u => u) };

    dependencias = {
      usuarioRepo: mockRepo,
      hashService: mockHashService,
      tokenService: mockTokenService,
      usuarioPresenter: mockPresenter
    };
  });

  test("lanza error si falta correo o contraseña", async () => {
    await expect(autenticarUsuario(dependencias, { password: "123" }))
      .rejects.toThrow("El correo es obligatorio.");

    await expect(autenticarUsuario(dependencias, { correo: "test@test.com" }))
      .rejects.toThrow("La contraseña es obligatoria.");
  });

  test("lanza error de credenciales inválidas si el correo no existe", async () => {
    mockRepo.getUsuarioByCorreo.mockResolvedValue(null);

    await expect(autenticarUsuario(dependencias, { correo: "falso@test.com", password: "123" }))
      .rejects.toThrow("Credenciales inválidas.");
  });

  test("lanza error de credenciales inválidas si la contraseña no coincide", async () => {
    mockRepo.getUsuarioByCorreo.mockResolvedValue({ id: 1, password_hash: "hash" });
    mockHashService.compare.mockResolvedValue(false); // Simula contraseña incorrecta

    await expect(autenticarUsuario(dependencias, { correo: "real@test.com", password: "bad" }))
      .rejects.toThrow("Credenciales inválidas.");
  });

  test("retorna usuario formateado y token en caso de éxito", async () => {
    const usuarioSimulado = { id: 1, correo: "real@test.com", password_hash: "hash" };
    
    mockRepo.getUsuarioByCorreo.mockResolvedValue(usuarioSimulado);
    mockHashService.compare.mockResolvedValue(true);
    mockTokenService.generarToken.mockReturnValue("token123");
    mockPresenter.formatearUsuario.mockReturnValue({ id: 1, correo: "real@test.com" });

    const result = await autenticarUsuario(dependencias, { correo: "real@test.com", password: "ok" });

    expect(mockHashService.compare).toHaveBeenCalledWith("ok", "hash");
    expect(mockTokenService.generarToken).toHaveBeenCalledWith(usuarioSimulado);
    expect(result).toEqual({
      usuario: { id: 1, correo: "real@test.com" },
      token: "token123"
    });
  });
});