const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST || 'postgres',
  user: process.env.PGUSER || 'avatar',
  password: process.env.PGPASSWORD || 'avatar123',
  database: process.env.PGDATABASE || 'aiavatar',
  port: process.env.PGPORT || 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
