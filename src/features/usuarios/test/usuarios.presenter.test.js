// src/features/usuarios/tests/usuarios.presenter.test.js

const usuariosPresenter = require("../presenter/usuarios.presenter");

describe("Usuarios Presenter", () => {
  test("debe formatear un usuario correctamente y ELIMINAR el password_hash", () => {
    const usuarioDesdeDB = {
      id: 1,
      nombre: "Juan Perez",
      correo: "juan@ejemplo.com",
      password_hash: "$2b$10$supersecretstringhashed",
      rol: "admin",
      created_at: "2026-04-14T14:16:09.276Z"
    };

    const resultado = usuariosPresenter.formatearUsuario(usuarioDesdeDB);

    expect(resultado).toEqual({
      id: 1,
      nombre: "Juan Perez",
      correo: "juan@ejemplo.com",
      rol: "admin",
      created_at: new Date("2026-04-14T14:16:09.276Z").toISOString()
    });
    
    expect(resultado.password_hash).toBeUndefined();
  });

  test("debe asignar el rol 'usuario' por defecto si no tiene rol", () => {
    const usuarioDesdeDB = {
      id: 2,
      nombre: "Ana Gomez",
      correo: "ana@ejemplo.com",
      password_hash: "hash",
      rol: null, // Sin rol asignado
      created_at: "2026-04-14T14:16:09.276Z"
    };

    const resultado = usuariosPresenter.formatearUsuario(usuarioDesdeDB);

    expect(resultado.rol).toBe("usuario");
  });
});