// ========================
// Archivo: backend/rutas/usuarios.js
// ========================
const express = require('express');
const router = express.Router();
const usuariosController = require('../controladores/usuariosController');
const { verifyToken, verifyRole } = require('../middlewares/auth');

// Listar todos (solo admin)
router.get(
  '/',
  verifyToken,
  verifyRole('admin'),
  usuariosController.listarUsuarios
);

// Obtener uno por ID (solo admin)
router.get(
  '/:id',
  verifyToken,
  verifyRole('admin'),
  usuariosController.obtenerUsuario
);

// Crear nuevo (solo admin)
router.post(
  '/',
  verifyToken,
  verifyRole('admin'),
  usuariosController.crearUsuario
);

// Actualizar (solo admin)
router.put(
  '/:id',
  verifyToken,
  verifyRole('admin'),
  usuariosController.actualizarUsuario
);

// Eliminar (solo admin)
router.delete(
  '/:id',
  verifyToken,
  verifyRole('admin'),
  usuariosController.eliminarUsuario
);

module.exports = router;
