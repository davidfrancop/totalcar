const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('facturas', {
    id_factura: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_orden: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ordenes_trabajo',
        key: 'id_orden'
      }
    },
    fecha_emision: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
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
    id_vehiculo: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    subtotal: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    impuestos: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "pendiente"
    }
  }, {
    sequelize,
    tableName: 'facturas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "facturas_pkey",
        unique: true,
        fields: [
          { name: "id_factura" },
        ]
      },
    ]
  });
};
