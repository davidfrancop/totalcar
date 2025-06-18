const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('citas', {
    id_cita: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fecha: {
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
    motivo: {
      type: DataTypes.TEXT,
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
    tableName: 'citas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "citas_pkey",
        unique: true,
        fields: [
          { name: "id_cita" },
        ]
      },
    ]
  });
};
