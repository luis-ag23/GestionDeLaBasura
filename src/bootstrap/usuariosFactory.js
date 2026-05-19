const bcrypt = require('bcrypt');
const usuarioRepo = require('../adapters/persistence/pgUsuarioRepository');
const usuarioPresenter = require('../adapters/presenter/jsonUsuarioPresenter');
const tokenService = require('../adapters/security/jwtTokenService'); // Inyectamos el nuevo servicio de tokens
const crearUsuarioUseCase = require('../application/usuarios/crearUsuario');
const obtenerUsuariosUseCase = require('../application/usuarios/obtenerUsuarios');
const autenticarUsuarioUseCase = require('../application/usuarios/autenticarUsuario'); // Importamos el caso de uso

function crearUsuario(datos) {
  return crearUsuarioUseCase({ usuarioRepo, hashService: bcrypt, usuarioPresenter }, datos);
}

function obtenerUsuarios() {
  return obtenerUsuariosUseCase({ usuarioRepo, usuarioPresenter });
}

function autenticarUsuario(credenciales) {
  return autenticarUsuarioUseCase({ 
    usuarioRepo, 
    hashService: bcrypt, 
    tokenService, 
    usuarioPresenter 
  }, credenciales);
}

module.exports = { 
  crearUsuario, 
  obtenerUsuarios, 
  autenticarUsuario 
};
