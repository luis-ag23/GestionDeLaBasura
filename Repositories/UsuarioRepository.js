const db = require('../db');

async function crearUsuario(nombre, correo, password_hash, rol) {
  const result = await db.query(
    `INSERT INTO usuarios (nombre, correo, password_hash, rol)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nombre, correo, password_hash, rol]
  );
  return result.rows[0];
}

async function obtenerUsuarios() {
  const result = await db.query('SELECT * FROM usuarios ORDER BY id');
  return result.rows;
}

module.exports = {
  crearUsuario,
  obtenerUsuarios
};