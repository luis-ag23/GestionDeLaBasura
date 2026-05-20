const pool = require("../../../db");

async function getAllReportes() {
  const result = await pool.query(`
    SELECT id, descripcion, ubicacion, imagen_url, estado, usuario_id, created_at
    FROM reportes
    ORDER BY created_at DESC
  `);

  return result.rows;
}

async function getReportesByUsuarioId(usuarioId) {
  const result = await pool.query(
    `
    SELECT id, descripcion, ubicacion, imagen_url, estado, usuario_id, created_at
    FROM reportes
    WHERE usuario_id = $1
    ORDER BY created_at DESC
    `,
    [usuarioId]
  );

  return result.rows;
}

async function getReporteById(id) {
  const result = await pool.query(
    `
    SELECT id, descripcion, ubicacion, imagen_url, estado, usuario_id, created_at
    FROM reportes
    WHERE id = $1
    `,
    [id]
  );

  return result.rows[0] || null;
}

async function createReporte({ descripcion, ubicacion, imagen_url, usuario_id }) {
  const result = await pool.query(
    `
    INSERT INTO reportes (descripcion, ubicacion, imagen_url, estado, usuario_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, descripcion, ubicacion, imagen_url, estado, usuario_id, created_at
    `,
    [descripcion, ubicacion, imagen_url, "pendiente", usuario_id]
  );

  return result.rows[0];
}

async function updateReporte(id, { descripcion, ubicacion, imagen_url, usuario_id }) {
  const result = await pool.query(
    `
    UPDATE reportes
    SET
      descripcion = $1,
      ubicacion = $2,
      imagen_url = $3,
      usuario_id = $4
    WHERE id = $5
    RETURNING id, descripcion, ubicacion, imagen_url, estado, usuario_id, created_at
    `,
    [descripcion, ubicacion, imagen_url, usuario_id, id]
  );

  return result.rows[0] || null;
}

async function obtenerPorId(id) {
  return getReporteById(id);
}

async function actualizar(id, datos) {
  return updateReporte(id, datos);
}

module.exports = {
  getAllReportes,
  getReportesByUsuarioId,
  getReporteById,
  createReporte,
  updateReporte,
  obtenerPorId,
  actualizar
};