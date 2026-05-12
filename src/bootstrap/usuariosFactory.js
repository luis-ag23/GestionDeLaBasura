const bcrypt = require('bcrypt');
const usuarioRepo = require('../adapters/persistence/pgUsuarioRepository');
const usuarioPresenter = require('../adapters/presenter/jsonUsuarioPresenter');
const crearUsuarioUseCase = require('../application/usuarios/crearUsuario');
const obtenerUsuariosUseCase = require('../application/usuarios/obtenerUsuarios');

function crearUsuario(datos) {
  return crearUsuarioUseCase({ usuarioRepo, hashService: bcrypt, usuarioPresenter }, datos);
}

function obtenerUsuarios() {
  return obtenerUsuariosUseCase({ usuarioRepo, usuarioPresenter });
}

module.exports = { crearUsuario, obtenerUsuarios };
