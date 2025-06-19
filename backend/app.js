// ========================
// Archivo: backend/app.js
// ========================
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Orígenes permitidos para CORS
const allowedOrigins = [
  process.env.CORS_ORIGIN_1 || 'http://localhost:5173',
  process.env.CORS_ORIGIN_2 || 'http://192.168.178.36:5173'
];

// Seguridad y parseo
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// CORS configurado para múltiples orígenes
app.use(cors({
  origin: (origin, callback) => {
    // permitir solicitudes sin origin (p. ej. Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  optionsSuccessStatus: 200
}));

// Health check
app.get("/", (req, res) =>
  res.json({ status: "OK", service: "TotalCar API", version: process.env.npm_package_version })
);

// Rutas públicas
app.use("/login", require("./rutas/login"));

// Autenticación JWT
const { verifyToken } = require("./middlewares/auth");
app.use(verifyToken);

// Rutas protegidas
app.use("/clientes", require("./rutas/clientes"));
app.use("/usuarios", require("./rutas/usuarios"));
app.use("/vehiculos", require("./rutas/vehiculos"));

// 404 - Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Error interno del servidor",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

module.exports = app;
