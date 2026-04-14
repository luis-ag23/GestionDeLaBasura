const db = require('./db');

async function probarConexion() {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('Conexión exitosa');
    console.log(result.rows[0]);
  } catch (error) {
    console.error('Error al conectar:', error.message);
  }
}

probarConexion();