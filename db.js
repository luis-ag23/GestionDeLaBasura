const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'aws-1-us-west-2.pooler.supabase.com',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER || 'postgres.wrsufdcnubqemjcwgocw',
  password: process.env.DB_PASSWORD || 'gestiondelabasura1',
  database: process.env.DB_NAME || 'postgres',
  ssl: {
    rejectUnauthorized: process.env.DB_SSL_REJECT === 'true' || false
  }
});

module.exports = pool;