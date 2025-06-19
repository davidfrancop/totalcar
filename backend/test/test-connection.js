// backend/test/test-connection.js
require("dotenv").config({ path: __dirname + "/../.env" });
const pool = require("../db/pool");  // Importa el pool que usa DB_… de tu .env

pool.connect()
  .then(() => {
    console.log("✔️ Conexión OK a PostgreSQL");
    return pool.end();
  })
  .catch(err => {
    console.error("❌ Fallo conexión:", err.message);
    return pool.end();
  });
