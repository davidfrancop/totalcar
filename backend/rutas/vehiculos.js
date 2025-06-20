// ========================
// Archivo: backend/rutas/vehiculos.js
// ========================
const express = require("express");
const router = express.Router();
const db = require("../modelos");

console.log("🧩 db.vehiculos:", db.vehiculos?.name || "❌ NO DEFINIDO");

// Obtener todos los vehículos
router.get("/", async (req, res) => {
  try {
    const vehiculos = await db.vehiculos.findAll();
    res.json(vehiculos);
  } catch (error) {
    console.error("❌ Error al obtener vehículos:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Obtener vehículos por cliente
router.get("/cliente/:id_cliente", async (req, res) => {
  try {
    const vehiculos = await db.vehiculos.findAll({
      where: { id_cliente: req.params.id_cliente },
    });
    res.json(vehiculos);
  } catch (error) {
    console.error("❌ Error al obtener vehículos por cliente:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Obtener un solo vehículo por ID
router.get("/:id_vehiculo", async (req, res) => {
  try {
    const vehiculo = await db.vehiculos.findByPk(req.params.id_vehiculo);
    if (!vehiculo) {
      return res.status(404).json({ error: "Vehículo no encontrado" });
    }
    res.json(vehiculo);
  } catch (error) {
    console.error("❌ Error al obtener el vehículo:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
