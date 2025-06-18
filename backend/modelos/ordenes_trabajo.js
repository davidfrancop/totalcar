const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ordenes_trabajo', {
    id_orden: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    fecha_entrega: {
      type: DataTypes.DATE,
      allowNull: true
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'empresas',
        key: 'id_empresa'
      }
    },
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'empleados',
        key: 'id_empleado'
      }
    },
    id_vehiculo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    estado: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "pendiente"
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ordenes_trabajo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ordenes_trabajo_pkey",
        unique: true,
        fields: [
          { name: "id_orden" },
        ]
      },
    ]
  });
};
