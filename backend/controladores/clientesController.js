// ========================
// Archivo: backend/controladores/clientesController.js
// ========================

const db = require('../modelos'); // Importa todos los modelos desde index.js
const Cliente = db.clientes;

// Listar todos los clientes
const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({ order: [['id_cliente', 'DESC']] });
    res.json(clientes);
  } catch (error) {
    console.error('Error al listar clientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener cliente simple por ID
const obtenerCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id, {
      attributes: ['id_cliente', 'nombre', 'apellido'],
    });
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener cliente con detalle completo
const obtenerClienteDetalle = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    console.error('Error al obtener detalle del cliente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear cliente
const crearCliente = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

// Actualizar cliente
const actualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    await cliente.update(req.body);
    res.json(cliente);
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

// Eliminar cliente
const eliminarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

    await cliente.destroy();
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
  eliminarCliente,
};
