const express = require("express");
const router = express.Router();
const usuariosController = require("../controller/usuarios.controller");

router.get("/", usuariosController.obtenerUsuarios);
router.post("/", usuariosController.crearUsuario);
router.post("/login", usuariosController.autenticarUsuario);

module.exports = router;