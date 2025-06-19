// ========================
// Archivo: backend/db/setup.js
// ========================
const pool = require("./pool");

async function crearTablas() {
  try {
    await pool.query(`
      -- Usuarios
      CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario SERIAL PRIMARY KEY,
        nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
        hash_contrasena TEXT NOT NULL,
        nombre VARCHAR(50),
        apellido VARCHAR(50),
        rol VARCHAR(20),
        activo BOOLEAN DEFAULT true,
        fecha_creacion TIMESTAMP DEFAULT NOW()
      );

      -- Empresas
      CREATE TABLE IF NOT EXISTS empresas (
        id_empresa SERIAL PRIMARY KEY,
        nombre_empresa VARCHAR(100) NOT NULL,
        id_fiscal VARCHAR(50) UNIQUE NOT NULL,
        persona_contacto VARCHAR(100),
        email_contacto VARCHAR(100),
        telefono_contacto VARCHAR(50),
        direccion TEXT,
        ciudad VARCHAR(100),
        pais VARCHAR(100)
      );

      -- Clientes
      CREATE TABLE IF NOT EXISTS clientes (
        id_cliente SERIAL PRIMARY KEY,
        tipo VARCHAR(20) NOT NULL,
        nombre VARCHAR(50) NOT NULL,
        apellido VARCHAR(50) NOT NULL,
        dni VARCHAR(20) UNIQUE,
        email VARCHAR(100),
        telefono_movil VARCHAR(50),
        telefono_oficina VARCHAR(50),
        telefono_casa VARCHAR(50),
        fecha_nacimiento DATE,
        id_empresa INTEGER REFERENCES empresas(id_empresa) ON DELETE SET NULL,
        fecha_alta TIMESTAMP DEFAULT NOW()
      );

      -- Vehículos
      CREATE TABLE IF NOT EXISTS vehiculos (
        id_vehiculo SERIAL PRIMARY KEY,
        id_cliente INTEGER NOT NULL REFERENCES clientes(id_cliente) ON DELETE CASCADE,
        matricula VARCHAR(20) UNIQUE NOT NULL,
        marca VARCHAR(50) NOT NULL,
        modelo VARCHAR(50) NOT NULL,
        vin VARCHAR(50) UNIQUE NOT NULL,
        codigo_identificacion VARCHAR(20),
        fecha_vehiculo DATE,
        fecha_ingreso DATE NOT NULL,
        notas TEXT
      );

      -- Índices para optimizar búsquedas
      CREATE INDEX IF NOT EXISTS idx_clientes_dni ON clientes(dni);
      CREATE INDEX IF NOT EXISTS idx_vehiculos_matricula ON vehiculos(matricula);
      CREATE INDEX IF NOT EXISTS idx_vehiculos_vin ON vehiculos(vin);
    `);

    console.log("✅ Tablas e índices creados correctamente.");
  } catch (error) {
    console.error("❌ Error al crear tablas:", error);
  } finally {
    await pool.end();
  }
}

crearTablas();
