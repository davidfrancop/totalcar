const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('factura_detalles', {
    id_detalle: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_factura: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'facturas',
        key: 'id_factura'
      }
    },
    concepto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    precio_unit: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    total: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'factura_detalles',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "factura_detalles_pkey",
        unique: true,
        fields: [
          { name: "id_detalle" },
        ]
      },
    ]
  });
};
