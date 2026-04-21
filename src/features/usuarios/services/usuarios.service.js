
const bcrypt = require("bcrypt");
const usuariosRepository = require("../repository/usuarios.repository");
const usuariosPresenter = require("../presenter/usuarios.presenter");

async function crearUsuario(datos) {
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(datos.password, salt);

  const usuarioCreado = await usuariosRepository.createUsuario({
    nombre: datos.nombre,
    correo: datos.correo,
    password_hash: password_hash,
    rol: datos.rol 
  });

  return usuariosPresenter.formatearUsuario(usuarioCreado);
}

module.exports = { crearUsuario };