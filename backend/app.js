// ========================
// Archivo: backend/app.js
// ========================
const express = require("express");
const cors = require("cors");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/login", require("./rutas/login"));
app.use("/clientes", require("./rutas/clientes"));
app.use("/usuarios", require("./rutas/usuarios"));
app.use("/vehiculos", require("./rutas/vehiculos"));

module.exports = app;
