// ========================
// Archivo: backend/rutas/usuarios.js
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

// ---------------------- OBTENER USUARIOS ----------------------
router.get("/", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT id_usuario, nombre_usuario, nombre, apellido, rol, activo FROM usuarios"
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error("? Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al consultar usuarios" });
  }
});

module.exports = router;

