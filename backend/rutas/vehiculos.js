// ========================
// Archivo: backend/rutas/vehiculos.js
// ========================
const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../db/pool");

const router = express.Router();

// Middleware de autenticación
router.use((req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer "))
    return res.status(401).json({ error: "Token no proporcionado" });
  try {
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET || "secreto");
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
});

// ---------------------- OBTENER DETALLE VEHÍCULO ----------------------
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      "SELECT * FROM vehiculos WHERE id_vehiculo = $1",
      [id]
    );
    if (!resultado.rows.length)
      return res.status(404).json({ error: "Vehículo no encontrado" });
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("? Error al obtener vehículo:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
