// ========================
// Archivo: backend/modelos/index.js
// ========================
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

const db = {};
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(file => file.endsWith(".js") && file !== basename)
  .forEach(file => {
    const defineModel = require(path.join(__dirname, file));
    const model = defineModel(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// RELACIONES ENTRE MODELOS
if (db.clientes && db.vehiculos) {
  db.clientes.hasMany(db.vehiculos, { foreignKey: 'id_cliente' });
  db.vehiculos.belongsTo(db.clientes, { foreignKey: 'id_cliente' });
}

if (db.clientes && db.facturas) {
  db.clientes.hasMany(db.facturas, { foreignKey: 'id_cliente' });
  db.facturas.belongsTo(db.clientes, { foreignKey: 'id_cliente' });
}

if (db.facturas && db.factura_detalles) {
  db.facturas.hasMany(db.factura_detalles, { foreignKey: 'id_factura' });
  db.factura_detalles.belongsTo(db.facturas, { foreignKey: 'id_factura' });
}

if (db.ordenes_trabajo && db.historial_servicios) {
  db.ordenes_trabajo.hasMany(db.historial_servicios, { foreignKey: 'id_orden' });
  db.historial_servicios.belongsTo(db.ordenes_trabajo, { foreignKey: 'id_orden' });
}

if (db.empresas && db.clientes) {
  db.empresas.hasMany(db.clientes, { foreignKey: 'id_empresa' });
  db.clientes.belongsTo(db.empresas, {
    foreignKey: 'id_empresa',
    as: 'empresa_asociada' // ❌ evita colisión con campo "empresa"
  });
}

if (db.citas && db.clientes) {
  db.citas.belongsTo(db.clientes, { foreignKey: 'id_cliente' });
}

if (db.citas && db.vehiculos) {
  db.citas.belongsTo(db.vehiculos, { foreignKey: 'id_vehiculo' });
}

if (db.citas && db.empleados) {
  db.citas.belongsTo(db.empleados, { foreignKey: 'id_empleado' });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
