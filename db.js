const { Pool } = require('pg');

const pool = new Pool({
  host: 'aws-1-us-west-2.pooler.supabase.com',
  port: 5432,
  user: 'postgres.wrsufdcnubqemjcwgocw',
  password: 'gestiondelabasura1',
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;