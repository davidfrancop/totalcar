// ========================
// Archivo: backend/controladores/clientesController.js
// ========================
const { pool } = require('../db/pool');

// Listar todos los clientes
const listarClientes = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM clientes ORDER BY id_cliente DESC');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al listar clientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener cliente por ID simple
const obtenerCliente = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await pool.query('SELECT id_cliente, nombre, apellido FROM clientes WHERE id_cliente = $1', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener cliente con detalle completo
const obtenerClienteDetalle = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await pool.query('SELECT * FROM clientes WHERE id_cliente = $1', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al obtener detalle del cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear cliente
const crearCliente = async (req, res) => {
  const {
    nombre, apellido, dni, ciudad, pais, email,
    telefono_oficina, telefono_casa, telefono_movil,
    fecha_nacimiento, notas, empresa, nombre_empresa,
    estado, calle, nro_casa, codigo_postal, id_empresa, tipo
  } = req.body;

  try {
    const resultado = await pool.query(
      `INSERT INTO clientes (
        nombre, apellido, dni, ciudad, pais, email,
        telefono_oficina, telefono_casa, telefono_movil,
        fecha_nacimiento, notas, empresa, nombre_empresa,
        estado, fecha_alta, calle, nro_casa, codigo_postal, id_empresa, tipo
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12, $13,
        $14, CURRENT_DATE, $15, $16, $17, $18, $19
      ) RETURNING *`,
      [
        nombre, apellido, dni, ciudad, pais, email,
        telefono_oficina, telefono_casa, telefono_movil,
        fecha_nacimiento, notas, empresa, nombre_empresa,
        estado, calle, nro_casa, codigo_postal, id_empresa, tipo
      ]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

// Actualizar cliente
const actualizarCliente = async (req, res) => {
  const id = req.params.id;
  const {
    nombre, apellido, dni, ciudad, pais, email,
    telefono_oficina, telefono_casa, telefono_movil,
    fecha_nacimiento, notas, empresa, nombre_empresa,
    estado, calle, nro_casa, codigo_postal, id_empresa, tipo
  } = req.body;

  try {
    const resultado = await pool.query(
      `UPDATE clientes SET
        nombre = $1, apellido = $2, dni = $3, ciudad = $4,
        pais = $5, email = $6, telefono_oficina = $7,
        telefono_casa = $8, telefono_movil = $9,
        fecha_nacimiento = $10, notas = $11, empresa = $12,
        nombre_empresa = $13, estado = $14, calle = $15,
        nro_casa = $16, codigo_postal = $17, id_empresa = $18, tipo = $19
      WHERE id_cliente = $20 RETURNING *`,
      [
        nombre, apellido, dni, ciudad, pais, email,
        telefono_oficina, telefono_casa, telefono_movil,
        fecha_nacimiento, notas, empresa, nombre_empresa,
        estado, calle, nro_casa, codigo_postal, id_empresa, tipo, id
      ]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

// Eliminar cliente
const eliminarCliente = async (req, res) => {
  const id = req.params.id;
  try {
    const resultado = await pool.query('DELETE FROM clientes WHERE id_cliente = $1 RETURNING *', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente eliminado' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};

module.exports = {
  listarClientes,
  obtenerCliente,
  obtenerClienteDetalle,
  crearCliente,
  actualizarCliente,
  eliminarCliente
};
