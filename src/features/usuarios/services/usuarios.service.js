
const bcrypt = require("bcrypt");
const usuariosRepository = require("../repository/usuarios.repository");
const usuariosPresenter = require("../presenter/usuarios.presenter");

async function crearUsuario(datos) {
  if (!datos.password) {
    throw new Error("La contraseña es obligatoria.");
  }

  const usuarioExistente = await usuariosRepository.getUsuarioByCorreo(datos.correo);
  if (usuarioExistente) {
    throw new Error("El correo ya está registrado.");
  }

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(datos.password, salt);

  const usuarioCreado = await usuariosRepository.createUsuario({
    nombre: datos.nombre,
    correo: datos.correo,
    password_hash: password_hash,
    rol: datos.rol || "usuario"
  });

  return usuariosPresenter.formatearUsuario(usuarioCreado);
}

module.exports = { crearUsuario };