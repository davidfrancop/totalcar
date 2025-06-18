// Archivo: backend/modelos/index.js

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
)

const db = {}

// Cargar todos los modelos excepto este archivo
const files = fs.readdirSync(__dirname).filter(
  (file) => file.endsWith('.js') && file !== 'index.js'
)

for (const file of files) {
  const modelModule = await import(`./${file}`)
  const defineModel = modelModule.default
  const model = defineModel(sequelize, Sequelize.DataTypes)
  db[model.name] = model
}

// RELACIONES - AJUSTA según tus claves foráneas reales
if (db.clientes && db.vehiculos) {
  db.clientes.hasMany(db.vehiculos, { foreignKey: 'id_cliente' })
  db.vehiculos.belongsTo(db.clientes, { foreignKey: 'id_cliente' })
}

if (db.clientes && db.facturas) {
  db.clientes.hasMany(db.facturas, { foreignKey: 'id_cliente' })
  db.facturas.belongsTo(db.clientes, { foreignKey: 'id_cliente' })
}

if (db.facturas && db.factura_detalles) {
  db.facturas.hasMany(db.factura_detalles, { foreignKey: 'id_factura' })
  db.factura_detalles.belongsTo(db.facturas, { foreignKey: 'id_factura' })
}

if (db.ordenes_trabajo && db.historial_servicios) {
  db.ordenes_trabajo.hasMany(db.historial_servicios, { foreignKey: 'id_orden' })
  db.historial_servicios.belongsTo(db.ordenes_trabajo, { foreignKey: 'id_orden' })
}

if (db.empresas && db.clientes) {
  db.empresas.hasMany(db.clientes, { foreignKey: 'id_empresa' })
  db.clientes.belongsTo(db.empresas, { foreignKey: 'id_empresa' })
}

if (db.citas && db.clientes) {
  db.citas.belongsTo(db.clientes, { foreignKey: 'id_cliente' })
}

if (db.citas && db.vehiculos) {
  db.citas.belongsTo(db.vehiculos, { foreignKey: 'id_vehiculo' })
}

if (db.citas && db.empleados) {
  db.citas.belongsTo(db.empleados, { foreignKey: 'id_empleado' })
}

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
