const pool = require("../../../db");

async function getAllUsuarios() {
  try {
    const result = await pool.query(`
      SELECT id, nombre, correo, password_hash, rol, created_at
      FROM usuarios
      ORDER BY created_at DESC
    `);
    return result.rows;
  } catch (error) {
    throw new Error("Error en base de datos al obtener usuarios.");
  }
}

async function getUsuarioByCorreo(correo) {
  try {
    const result = await pool.query(
      `SELECT id, nombre, correo, password_hash, rol, created_at FROM usuarios WHERE correo = $1`,
      [correo]
    );
    return result.rows[0] || null;
  } catch (error) {
    throw new Error("Error en base de datos al buscar usuario por correo.");
  }
}

async function createUsuario({ nombre, correo, password_hash, rol }) {
  try {
    const result = await pool.query(
      `
      INSERT INTO usuarios (nombre, correo, password_hash, rol)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, correo, rol, created_at
      `,
      [nombre, correo, password_hash, rol || "usuario"]
    );
    return result.rows[0];
  } catch (error) {
    if (error.code === "23505") {
      throw new Error("El correo ya está registrado.");
    }
    throw new Error("Error en base de datos al crear el usuario.");
  }
}

module.exports = {
  getAllUsuarios,
  getUsuarioByCorreo,
  createUsuario
};