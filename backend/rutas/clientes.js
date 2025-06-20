// ========================
// Archivo: backend/rutas/clientes.js
// ========================

const express = require('express');
const router = express.Router();
const clientesController = require('../controladores/clientesController');
const { verifyToken, verifyRole } = require('../middlewares/auth');

// Listar todos los clientes (roles admin y recepción)
router.get(
  '/',
  verifyToken,
  verifyRole('admin', 'recepcion'),
  clientesController.listarClientes
);

// Obtener cliente con más detalle (para vista de edición)
router.get(
  '/:id/detalle',
  verifyToken,
  verifyRole('admin', 'recepcion'),
  clientesController.obtenerClienteDetalle
);

// Obtener detalle simple (por ID)
router.get(
  '/:id',
  verifyToken,
  verifyRole('admin', 'recepcion'),
  clientesController.obtenerCliente
);

// Crear nuevo cliente (solo admin)
router.post(
  '/',
  verifyToken,
  verifyRole('admin'),
  clientesController.crearCliente
);

// Actualizar cliente existente (solo admin)
router.put(
  '/:id',
  verifyToken,
  verifyRole('admin'),
  clientesController.actualizarCliente
);

// Eliminar cliente (solo admin)
router.delete(
  '/:id',
  verifyToken,
  verifyRole('admin'),
  clientesController.eliminarCliente
);

module.exports = router;
