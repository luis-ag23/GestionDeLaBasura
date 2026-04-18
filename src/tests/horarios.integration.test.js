const pool = require("../../db");

describe("horarios integration", () => {
  test("debería traer horarios reales desde la base de datos", async () => {
    const result = await pool.query("SELECT * FROM horarios");

    expect(result.rows.length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await pool.end();
  });
});