// ========================
// Archivo: backend/rutas/login.js
// ========================
const express = require("express");
const router = express.Router();
const { login } = require("../controladores/loginController");

// POST /login
router.post("/", login);

module.exports = router;
