// ========================
// Archivo: backend/modelos/vehiculos.js
// ========================
const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehiculos', {
    id_vehiculo: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clientes',
        key: 'id_cliente'
      }
    },
    matricula: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "vehiculos_matricula_key"
    },
    marca: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    modelo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    vin: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_alta: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    },
    fecha_ingreso_taller: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "activo"
    },
    tipo_combustible: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    kilometraje: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    color: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    transmision: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_ultimo_servicio: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    imagen_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    proximo_servicio: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    ficha_tecnica_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hsn_tsn: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    propietario_nombre: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    propietario_dni: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bateria_estado: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fecha_entrega_estimada: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    umweltplakette: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tuv_valido_hasta: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'vehiculos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "vehiculos_matricula_key",
        unique: true,
        fields: [
          { name: "matricula" },
        ]
      },
      {
        name: "vehiculos_pkey",
        unique: true,
        fields: [
          { name: "id_vehiculo" },
        ]
      },
    ]
  });
};
