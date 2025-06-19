// ========================
// Archivo: backend/middlewares/auth.js
// ========================
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Verificar token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token inválido" });

    req.user = decoded;
    next();
  });
}

// Verificar rol
function verifyRole(...rolesPermitidos) {
  return (req, res, next) => {
    const rol = req.user.rol;
    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    next();
  };
}

module.exports = { verifyToken, verifyRole };
