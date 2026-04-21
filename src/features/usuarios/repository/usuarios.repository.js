const pool = require("../../../../db");

async function getAllUsuarios() {
  const result = await pool.query(`
    SELECT id, nombre, correo, password_hash, rol, created_at
    FROM usuarios
    ORDER BY created_at DESC
  `);
  return result.rows;
}

async function getUsuarioByCorreo(correo) {
  const result = await pool.query(
    `SELECT id, nombre, correo, password_hash, rol, created_at FROM usuarios WHERE correo = $1`,
    [correo]
  );
  return result.rows[0];
}

async function createUsuario({ nombre, correo, password_hash, rol }) {
  const result = await pool.query(
    `
    INSERT INTO usuarios (nombre, correo, password_hash, rol)
    VALUES ($1, $2, $3, $4)
    RETURNING id, nombre, correo, rol, created_at
    `,
    [nombre, correo, password_hash, rol || "usuario"]
  );

  return result.rows[0];
}

module.exports = {
  getAllUsuarios,
  getUsuarioByCorreo,
  createUsuario
};