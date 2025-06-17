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
    const result = await pool.query(
      "DELETE FROM usuarios WHERE id_usuario = $1",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({ mensaje: "Usuario eliminado" });
  } catch (error) {
    console.error("Error en DELETE /usuarios/:id:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

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

// Obtener detalle completo de cliente + sus vehículos
app.get("/clientes/:id/detalle", async (req, res) => {
  const { id } = req.params;
  try {
    const clienteResult = await pool.query(
      `SELECT * FROM clientes WHERE id_cliente = $1`,
      [id]
    );

    if (clienteResult.rows.length === 0) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const vehiculosResult = await pool.query(
      `SELECT * FROM vehiculos WHERE id_cliente = $1 ORDER BY id_vehiculo DESC`,
      [id]
    );

    res.json({
      cliente: clienteResult.rows[0],
      vehiculos: vehiculosResult.rows,
    });
  } catch (error) {
    console.error("Error en GET /clientes/:id/detalle:", error);
    res.status(500).json({ error: "Error al obtener detalles del cliente" });
  }
});

// -------------------- VEHÍCULOS ----------------------
// Obtener datos completos de un vehículo por ID
app.get("/vehiculos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT v.*, 
             c.nombre || ' ' || c.apellido AS nombre_cliente
        FROM vehiculos v
   LEFT JOIN clientes c ON v.id_cliente = c.id_cliente
       WHERE v.id_vehiculo = $1
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error en GET /vehiculos/:id:", error);
    res.status(500).json({ error: "Error al obtener datos del vehículo" });
  }
});

// Obtener todos los vehículos
app.get("/vehiculos", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT v.*, 
             c.nombre || ' ' || c.apellido AS nombre_cliente
        FROM vehiculos v
   LEFT JOIN clientes c ON v.id_cliente = c.id_cliente
    ORDER BY v.id_vehiculo DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error en GET /vehiculos:", error);
    res.status(500).json({ error: "Error al obtener la lista de vehículos" });
  }
});

// -------------------- DASHBOARD ----------------------
app.get("/resumen-dashboard", async (req, res) => {
  try {
    const totalClientes = await pool.query("SELECT COUNT(*) FROM clientes");
    const totalVehiculos = await pool.query("SELECT COUNT(*) FROM vehiculos");

    res.json({
      total_clientes: parseInt(totalClientes.rows[0].count),
      total_vehiculos: parseInt(totalVehiculos.rows[0].count),
    });
  } catch (error) {
    console.error("Error en GET /resumen-dashboard:", error);
    res.status(500).json({ error: "Error al obtener resumen del dashboard" });
  }
});

// -------------------- TEST ----------------------
app.get("/", (req, res) => {
  res.send("Backend TotalCar está funcionando 🚗✨");
});

// -------------------- INICIAR SERVIDOR ----------------------
app.listen(4000, "0.0.0.0", () => {
  console.log("Backend TotalCar escuchando en puerto 4000 y en todas las interfaces (0.0.0.0)");
});
