// ========================
// Archivo: backend/rutas/clientes.js
// ========================
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {
  registrarCliente,
  obtenerClientes,
  obtenerDetalleCliente
} = require("../controladores/clientesController");

// Middleware de autenticación
function verificarToken(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  try {
    const token = auth.split(" ")[1];
    jwt.verify(token, "secreto");
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido" });
  }
}

router.post("/", registrarCliente);
router.get("/", verificarToken, obtenerClientes);
router.get("/:id/detalle", verificarToken, obtenerDetalleCliente);

module.exports = router;
