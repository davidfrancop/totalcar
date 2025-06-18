// ========================
// Archivo: backend/controladores/clientesController.js
// ========================
const pool = require("../db/pool");

async function registrarCliente(req, res) {
  const {
    tipo, nombre, apellido, dni, email, telefono,
    nombre_empresa, id_fiscal, persona_contacto,
    email_contacto, telefono_contacto, direccion,
    ciudad, pais
  } = req.body;

  try {
    if (tipo === "particular") {
      await pool.query(
        `INSERT INTO clientes (tipo, nombre, apellido, dni, email, telefono_movil)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [tipo, nombre, apellido, dni, email, telefono]
      );
    } else if (tipo === "empresa") {
      let empresaId;
      const buscar = await pool.query(
        "SELECT id_empresa FROM empresas WHERE id_fiscal = $1",
        [id_fiscal]
      );
      if (buscar.rows.length) {
        empresaId = buscar.rows[0].id_empresa;
      } else {
        const nueva = await pool.query(
          `INSERT INTO empresas (nombre_empresa, id_fiscal, persona_contacto, email_contacto, telefono_contacto, direccion, ciudad, pais)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id_empresa`,
          [
            nombre_empresa,
            id_fiscal,
            persona_contacto,
            email_contacto,
            telefono_contacto,
            direccion,
            ciudad,
            pais,
          ]
        );
        empresaId = nueva.rows[0].id_empresa;
      }
      await pool.query(
        `INSERT INTO clientes (tipo, id_empresa, email, telefono_movil)
         VALUES ($1, $2, $3, $4)`,
        ["empresa", empresaId, email_contacto, telefono_contacto]
      );
    } else {
      return res.status(400).json({ error: "Tipo de cliente inválido" });
    }
    res.json({ mensaje: "Cliente registrado correctamente" });
  } catch (error) {
    console.error("❌ Error al registrar cliente:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
}

async function obtenerClientes(req, res) {
  try {
    const resultado = await pool.query(`
      SELECT
        c.id_cliente, c.tipo, c.nombre, c.apellido, c.dni, c.email,
        COALESCE(c.telefono_movil,c.telefono_oficina,c.telefono_casa) AS telefono,
        c.id_empresa, e.nombre_empresa,
        COALESCE(c.nombre,e.nombre_empresa) AS nombre_visible
      FROM clientes c
      LEFT JOIN empresas e ON c.id_empresa = e.id_empresa
      ORDER BY c.id_cliente DESC
    `);
    res.json(resultado.rows);
  } catch (error) {
    console.error("❌ Error al obtener clientes:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
}

async function obtenerDetalleCliente(req, res) {
  const { id } = req.params;
  try {
    const cliente = await pool.query(
      `SELECT c.*, e.nombre_empresa,
              COALESCE(c.nombre,e.nombre_empresa) AS nombre_visible
       FROM clientes c
       LEFT JOIN empresas e ON c.id_empresa = e.id_empresa
       WHERE c.id_cliente = $1`,
      [id]
    );
    if (!cliente.rows.length)
      return res.status(404).json({ error: "Cliente no encontrado" });

    const vehiculos = await pool.query(
      `SELECT * FROM vehiculos WHERE id_cliente = $1
       ORDER BY id_vehiculo DESC`,
      [id]
    );

    res.json({ cliente: cliente.rows[0], vehiculos: vehiculos.rows });
  } catch (error) {
    console.error("❌ Error al obtener detalle del cliente:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
}

module.exports = {
  registrarCliente,
  obtenerClientes,
  obtenerDetalleCliente
};
