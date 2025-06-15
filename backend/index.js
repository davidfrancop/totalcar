// Archivo: backend/index.js

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "totalcar",
  password: "16Ignacio#",
  port: 5432,
});

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 LOGIN
app.post("/login", async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const resultado = await pool.query(
      "SELECT * FROM usuarios WHERE nombre_usuario = $1",
      [usuario]
    );

    if (resultado.rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = resultado.rows[0];
    const coincide = await bcrypt.compare(contrasena, user.hash_contrasena);

    if (!coincide) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({
      mensaje: "Login exitoso",
      rol: user.rol,
      token: "token-falso-por-ahora",
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// 🆕 REGISTRAR USUARIO
app.post("/register", async (req, res) => {
  const { usuario, contrasena, email, rol, nombre, apellido } = req.body;

  try {
    const hashContrasena = await bcrypt.hash(contrasena, 10);

    const result = await pool.query(
      `INSERT INTO usuarios 
       (nombre_usuario, hash_contrasena, email, rol, nombre, apellido, activo, fecha_creacion)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       RETURNING id_usuario, nombre_usuario, email, rol, nombre, apellido, activo`,
      [usuario, hashContrasena, email, rol, nombre, apellido, true]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error en /register:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// 📋 OBTENER USUARIOS
app.get("/usuarios", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id_usuario, nombre_usuario, nombre, apellido, rol, activo FROM usuarios
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// ✏️ EDITAR USUARIO (rol y activo)
app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { rol, activo } = req.body;

  try {
    await pool.query(
      "UPDATE usuarios SET rol = $1, activo = $2 WHERE id_usuario = $3",
      [rol, activo, id]
    );
    res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

// 🗑 ELIMINAR USUARIO
app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM usuarios WHERE id_usuario = $1", [id]);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

// 📋 OBTENER CLIENTES
app.get("/clientes", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id_cliente, nombre, apellido, dni, direccion, ciudad, pais, email,
             telefono_oficina, telefono_casa, telefono_movil, fecha_nacimiento,
             notas, empresa, nombre_empresa, estado, fecha_alta
      FROM clientes
    `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
});

// 🗑 ELIMINAR CLIENTE
app.delete("/clientes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM clientes WHERE id_cliente = $1", [id]);
    res.json({ mensaje: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    res.status(500).json({ error: "Error al eliminar cliente" });
  }
});

// 🆕 REGISTRAR CLIENTE + VEHÍCULO
app.post("/cliente-con-vehiculo", async (req, res) => {
  const { cliente, vehiculo } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const resultCliente = await client.query(
      `INSERT INTO clientes
        (nombre, apellido, dni, direccion, ciudad, pais, email,
         telefono_oficina, telefono_casa, telefono_movil, fecha_nacimiento,
         notas, empresa, nombre_empresa, estado, fecha_alta)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11,
               $12, $13, $14, $15, NOW())
       RETURNING id_cliente`,
      [
        cliente.nombre, cliente.apellido, cliente.dni, cliente.direccion,
        cliente.ciudad, cliente.pais, cliente.email,
        cliente.telefono_oficina, cliente.telefono_casa, cliente.telefono_movil,
        cliente.fecha_nacimiento, cliente.notas, cliente.empresa,
        cliente.nombre_empresa, cliente.estado
      ]
    );

    const id_cliente = resultCliente.rows[0].id_cliente;

    await client.query(
      `INSERT INTO vehiculos
        (id_cliente, matricula, marca, modelo, anio, vin, codigo_vehiculo_ale,
         fecha_alta, fecha_ingreso_taller, notas, estado, tipo_combustible,
         kilometraje, color, transmision, fecha_ultimo_servicio, imagen_url,
         proximo_servicio, ficha_tecnica_url, hsn_tsn, revision_tecnica_fecha,
         propietario_nombre, propietario_dni, bateria_estado, ubicacion_actual,
         fecha_entrega_estimada, umweltplakette, tuv_valido_hasta)
       VALUES
        ($1, $2, $3, $4, $5, $6, $7,
         $8, $9, $10, $11, $12,
         $13, $14, $15, $16, $17,
         $18, $19, $20, $21,
         $22, $23, $24, $25,
         $26, $27, $28)`,
      [
        id_cliente, vehiculo.matricula, vehiculo.marca, vehiculo.modelo, vehiculo.anio,
        vehiculo.vin, vehiculo.codigo_vehiculo_ale,
        vehiculo.fecha_alta, vehiculo.fecha_ingreso_taller, vehiculo.notas,
        vehiculo.estado, vehiculo.tipo_combustible, vehiculo.kilometraje,
        vehiculo.color, vehiculo.transmision, vehiculo.fecha_ultimo_servicio,
        vehiculo.imagen_url, vehiculo.proximo_servicio, vehiculo.ficha_tecnica_url,
        vehiculo.hsn_tsn, vehiculo.revision_tecnica_fecha,
        vehiculo.propietario_nombre, vehiculo.propietario_dni, vehiculo.bateria_estado,
        vehiculo.ubicacion_actual, vehiculo.fecha_entrega_estimada,
        vehiculo.umweltplakette, vehiculo.tuv_valido_hasta
      ]
    );

    await client.query("COMMIT");
    res.status(201).json({ mensaje: "Cliente y vehículo registrados" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error en /cliente-con-vehiculo:", error);
    res.status(500).json({ error: "Error al registrar cliente y vehículo" });
  } finally {
    client.release();
  }
});

// 🚀 INICIAR SERVIDOR
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Backend TotalCar escuchando en puerto ${PORT}`);
});
