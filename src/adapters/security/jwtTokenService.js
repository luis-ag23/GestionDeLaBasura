const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "secreto-desarrollo-gestion-basura";

function generarToken(usuario) {
  const payload = {
    id: usuario.id,
    correo: usuario.correo,
    rol: usuario.rol
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "8h" });
}

function verificarToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Token inválido o expirado.");
  }
}

module.exports = {
  generarToken,
  verificarToken
};