// ========================
// Archivo: backend/controladores/loginController.js
// ========================
const pool = require("../db/pool");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { usuario, contrasena } = req.body;
  try {
    const resultado = await pool.query(
      "SELECT * FROM usuarios WHERE nombre_usuario = $1",
      [usuario]
    );
    if (!resultado.rows.length) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }
    const user = resultado.rows[0];
    const coincide = await bcrypt.compare(contrasena, user.hash_contrasena);
    if (!coincide) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id_usuario, rol: user.rol },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "4h" }
    );

    res.json({ mensaje: "Login exitoso", token, rol: user.rol });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
}

module.exports = { login };

