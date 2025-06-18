// ========================
// Archivo: backend/db/pool.js
// ========================
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "totalcar",
  password: "16Ignacio#",
  port: 5432,
});

module.exports = pool;
