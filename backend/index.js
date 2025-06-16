// Archivo: backend/index.js

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "totalcar",
  password: "16Ignacio#",
  port: 5432,
});

const app = express();
app.use(cors());
app.use(express.json());

// Utilidad para convertir string vacío en null
function vacioANull(valor) {
  return valor === "" ? null : valor;
}

// ---------------------- LOGIN ----------------------
app.post("/login", async (req, res) => {
  const { usuario, contrasena } = req.body;
  try {
    const resultado = await pool.query(
      "SELECT * FROM usuarios WHERE nombre_usuario = $1",
      [usuario]
    );
    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }
    const user = resultado.rows[0];
    const coincide = await bcrypt.compare(contrasena, user.hash_contrasena);

    if (!coincide) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({
      mensaje: "Login exitoso",
      rol: user.rol,
      token: "token-falso-por-ahora",
    });
  } catch (error) {
    console.error("Error en /login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ---------------------- USUARIOS ----------------------
app.get("/usuarios", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id_usuario, nombre_usuario, nombre, apellido, rol, activo FROM usuarios ORDER BY id_usuario`
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error en GET /usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { rol, activo } = req.body;
  try {
    const result = await pool.query(
      `UPDATE usuarios SET rol = $1, activo = $2 WHERE id_usuario = $3 RETURNING *`,
      [rol, activo, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ mensaje: "Usuario actualizado" });
  } catch (error) {
    console.error("Error en PUT /usuarios/:id:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM usuarios WHERE id_usuario = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    console.error("Error en DELETE /usuarios/:id:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

// ----------- REGISTRAR CLIENTE + VEHÍCULO -----------
// (ya incluido correctamente en tu código, no se repite aquí)

// -------------------- CLIENTES ----------------------
// Obtener clientes + cantidad de autos
app.get("/clientes-autos", async (req, res) => {
  try {
    console.log("GET /clientes-autos - solicitando datos...");
    const result = await pool.query(
      `SELECT c.id_cliente, c.nombre, c.apellido, c.email, c.telefono_movil, 
              CASE WHEN c.estado = 'activo' THEN true ELSE false END AS activo,
              c.estado,
              COUNT(v.id_vehiculo) AS cantidad_autos
         FROM clientes c
         LEFT JOIN vehiculos v ON v.id_cliente = c.id_cliente
        GROUP BY c.id_cliente, c.nombre, c.apellido, c.email, c.telefono_movil, c.estado
        ORDER BY c.id_cliente DESC`
    );
    console.log("Resultado de clientes-autos:", result.rows.length, "registros.");
    res.json(result.rows);
  } catch (error) {
    console.error("Error en GET /clientes-autos:", error);
    res.status(500).json({ error: "Error al obtener clientes con autos" });
  }
});

// -------------------- TEST ----------------------
app.get("/", (req, res) => {
  res.send("Backend TotalCar está funcionando 🚗✨");
});

app.listen(4000, '0.0.0.0', () => {
  console.log("Backend TotalCar escuchando en puerto 4000 y en todas las interfaces (0.0.0.0)");
});
