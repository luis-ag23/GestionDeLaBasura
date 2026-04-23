const pool = require("../../../../db"); 

async function getAllHorarios() {
  const result = await pool.query("SELECT * FROM horarios ORDER BY codigo");
  return result.rows;
}

module.exports = {
  getAllHorarios
};