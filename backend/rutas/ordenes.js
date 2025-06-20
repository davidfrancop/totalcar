// ========================
// Archivo: backend/rutas/ordenes.js
// ========================
const express = require("express");
const router = express.Router();
const db = require("../modelos");

// Crear nueva orden de trabajo
router.post("/", async (req, res) => {
  const { id_cliente, id_vehiculo, descripcion, estado, fecha_ingreso } = req.body;

  try {
    const nuevaOrden = await db.ordenes_trabajo.create({
      id_cliente,
      id_vehiculo,
      descripcion,
      estado,
      fecha_ingreso
    });
    res.status(201).json(nuevaOrden);
  } catch (error) {
    console.error("❌ Error al crear orden:", error);
    res.status(500).json({ error: "Error al crear la orden de trabajo" });
  }
});

// Obtener todas las órdenes de trabajo
router.get("/", async (req, res) => {
  try {
    const ordenes = await db.ordenes_trabajo.findAll();
    res.json(ordenes);
  } catch (error) {
    console.error("❌ Error al obtener órdenes:", error);
    res.status(500).json({ error: "Error al obtener órdenes de trabajo" });
  }
});

module.exports = router;
