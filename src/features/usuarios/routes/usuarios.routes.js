const express = require("express");
const router = express.Router();
const usuariosController = require("../controller/usuarios.controller");

router.get("/", usuariosController.obtenerUsuarios);
router.post("/", usuariosController.crearUsuario);

module.exports = router;