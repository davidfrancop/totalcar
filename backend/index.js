// ========================
// Archivo: backend/index.js
// ========================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();

// Middleware
dotenv.config();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/clientes", require("./rutas/clientes"));
app.use("/vehiculos", require("./rutas/vehiculos"));
app.use("/usuarios", require("./rutas/usuarios"));
app.use("/login", require("./rutas/login"));
app.use("/ordenes", require("./rutas/ordenes")); // nueva ruta de órdenes de trabajo

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("✅ Backend TotalCar escuchando en puerto", PORT, "y en todas las interfaces (0.0.0.0)");
});
