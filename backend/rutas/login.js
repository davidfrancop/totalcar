// ========================
// Archivo: backend/rutas/login.js
// ========================
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { pool } = require("../db/pool");
require("dotenv").config();

router.post("/", async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const resultado = await pool.query("SELECT * FROM usuarios WHERE nombre_usuario = $1", [usuario]);

    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = resultado.rows[0];
    const coincide = await bcrypt.compare(contrasena, user.hash_contrasena);

    if (!coincide) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id_usuario, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ mensaje: "Login exitoso", rol: user.rol, token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
