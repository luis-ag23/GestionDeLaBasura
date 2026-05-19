const usuariosFactory = require("../../../bootstrap/usuariosFactory");

async function obtenerUsuarios(req, res) {
  try {
    const usuarios = await usuariosFactory.obtenerUsuarios();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({ message: "No se pudieron obtener los usuarios." });
  }
}

async function crearUsuario(req, res) {
  try {
    const { nombre, correo, password, rol } = req.body;

    const nuevoUsuario = await usuariosFactory.crearUsuario({ nombre, correo, password, rol });

    return res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);

    const esErrorDeValidacion = error.message.includes("obligatorio") || error.message.includes("registrado");
    const statusCode = esErrorDeValidacion ? 400 : 500;
    
    return res.status(statusCode).json({ message: error.message || "No se pudo crear el usuario." });
  }
}
  
  async function autenticarUsuario(req, res) {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ message: "El correo y la contraseña son obligatorios." });
    }

    const sesionUsuario = await usuariosFactory.autenticarUsuario({ correo, password });

    return res.status(200).json(sesionUsuario);
  } catch (error) {
    console.error("[UsuariosController] Error en autenticación:", error);

    const esErrorDeCredenciales = error.message.includes("incorrecta") || error.message.includes("no registrado");
    if (esErrorDeCredenciales) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    return res.status(500).json({ message: "Error interno al autenticar al usuario." });
  }
}

module.exports = {
  obtenerUsuarios,
  crearUsuario,
  autenticarUsuario
};