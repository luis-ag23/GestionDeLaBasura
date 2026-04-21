// src/features/usuarios/tests/usuarios.service.test.js

const usuariosService = require("../services/usuarios.service");
const usuariosRepository = require("../repository/usuarios.repository");
const usuariosPresenter = require("../presenter/usuarios.presenter");
const bcrypt = require("bcrypt");

jest.mock("../repository/usuarios.repository");
jest.mock("../presenter/usuarios.presenter");
jest.mock("bcrypt");

describe("Usuarios Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("crearUsuario", () => {
    test("debe encriptar la contraseña y crear el usuario exitosamente", async () => {
      const datosEntrada = {
        nombre: "Maria Santos",
        correo: "maria@ejemplo.com",
        password: "mipassword123",
        rol: "admin"
      };

      usuariosRepository.getUsuarioByCorreo.mockResolvedValue(null); // Simulamos que el correo NO existe
      bcrypt.genSalt.mockResolvedValue("fakeSalt"); // Simulamos la sal
      bcrypt.hash.mockResolvedValue("hashed_mipassword123"); // Simulamos el hash resultante
      
      const usuarioSimuladoDB = { id: 1, ...datosEntrada, password_hash: "hashed_mipassword123" };
      usuariosRepository.createUsuario.mockResolvedValue(usuarioSimuladoDB);
      
      const usuarioFormateado = { id: 1, nombre: "Maria Santos", correo: "maria@ejemplo.com", rol: "admin" };
      usuariosPresenter.formatearUsuario.mockReturnValue(usuarioFormateado);

      const resultado = await usuariosService.crearUsuario(datosEntrada);

      expect(usuariosRepository.getUsuarioByCorreo).toHaveBeenCalledWith("maria@ejemplo.com");
      expect(bcrypt.hash).toHaveBeenCalledWith("mipassword123", "fakeSalt");
      expect(usuariosRepository.createUsuario).toHaveBeenCalledWith({
        nombre: "Maria Santos",
        correo: "maria@ejemplo.com",
        password_hash: "hashed_mipassword123",
        rol: "admin"
      });
      expect(resultado).toEqual(usuarioFormateado);
    });

    test("debe asignar el rol 'usuario' si no se envía uno", async () => {
      const datosEntrada = {
        nombre: "Luis",
        correo: "luis@ejemplo.com",
        password: "123"
      };

      usuariosRepository.getUsuarioByCorreo.mockResolvedValue(null);
      bcrypt.genSalt.mockResolvedValue("salt");
      bcrypt.hash.mockResolvedValue("hash");
      usuariosRepository.createUsuario.mockResolvedValue({});
      
      await usuariosService.crearUsuario(datosEntrada);

      expect(usuariosRepository.createUsuario).toHaveBeenCalledWith(
        expect.objectContaining({
          rol: "usuario"
        })
      );
    });

    test("debe lanzar un error si el correo ya está registrado", async () => {
      const datosEntrada = {
        nombre: "Pedro",
        correo: "pedro@ejemplo.com",
        password: "123"
      };

      usuariosRepository.getUsuarioByCorreo.mockResolvedValue({ id: 1, correo: "pedro@ejemplo.com" });

      await expect(usuariosService.crearUsuario(datosEntrada))
        .rejects
        .toThrow("El correo ya está registrado.");

      expect(usuariosRepository.createUsuario).not.toHaveBeenCalled();
    });

    test("debe lanzar un error si falta la contraseña", async () => {
      const datosEntrada = {
        nombre: "Ana",
        correo: "ana@ejemplo.com"
      };

      await expect(usuariosService.crearUsuario(datosEntrada))
        .rejects
        .toThrow("La contraseña es obligatoria.");
    });
  });
});