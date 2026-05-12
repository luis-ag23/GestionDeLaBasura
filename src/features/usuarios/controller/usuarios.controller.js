const bcrypt = require("bcrypt");
const crearUsuarioUseCase = require("../../../application/usuarios/crearUsuario");
const obtenerUsuariosUseCase = require("../../../application/usuarios/obtenerUsuarios");
const usuarioRepo = require("../../../adapters/persistence/pgUsuarioRepository");
const usuarioPresenter = require("../../../adapters/presenter/jsonUsuarioPresenter");

async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await obtenerUsuariosUseCase({ usuarioRepo, usuarioPresenter });
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ message: "No se pudieron obtener los usuarios." });
  }
}

async function crearUsuario(req, res) {
  try {
    const { nombre, correo, password, rol } = req.body;

    const nuevoUsuario = await crearUsuarioUseCase({ usuarioRepo, hashService: bcrypt, usuarioPresenter }, { nombre, correo, password, rol });

    return res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);

    if (error.message.includes("obligatorio") || error.message.includes("registrado")) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "No se pudo crear el usuario." });
  }
}

module.exports = {
  obtenerUsuarios,
  crearUsuario
};