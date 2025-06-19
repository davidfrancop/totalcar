// ========================
// Archivo: backend/controladores/usuariosController.js
// ========================
const { pool } = require('../db/pool');
const bcrypt = require('bcrypt');

// 1. Listar todos los usuarios
const listarUsuarios = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         id_usuario, nombre_usuario, rol, nombre, apellido, activo, fecha_creacion 
       FROM usuarios 
       ORDER BY id_usuario DESC`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// 2. Obtener uno por ID
const obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT 
         id_usuario, nombre_usuario, rol, nombre, apellido, activo, fecha_creacion 
       FROM usuarios 
       WHERE id_usuario = $1`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// 3. Crear nuevo usuario
const crearUsuario = async (req, res) => {
  const { nombre_usuario, contrasena, rol, nombre, apellido, activo } = req.body;
  try {
    const hash = await bcrypt.hash(contrasena, 10);
    const result = await pool.query(
      `INSERT INTO usuarios 
        (nombre_usuario, hash_contrasena, rol, nombre, apellido, activo, fecha_creacion) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       RETURNING id_usuario, nombre_usuario, rol, nombre, apellido, activo, fecha_creacion`,
      [nombre_usuario, hash, rol, nombre, apellido, activo]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// 4. Actualizar usuario
const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre_usuario, rol, nombre, apellido, activo } = req.body;
  try {
    const result = await pool.query(
      `UPDATE usuarios SET
         nombre_usuario = $1,
         rol = $2,
         nombre = $3,
         apellido = $4,
         activo = $5
       WHERE id_usuario = $6
       RETURNING id_usuario, nombre_usuario, rol, nombre, apellido, activo, fecha_creacion`,
      [nombre_usuario, rol, nombre, apellido, activo, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// 5. Eliminar usuario
const eliminarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

module.exports = {
  listarUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
};
