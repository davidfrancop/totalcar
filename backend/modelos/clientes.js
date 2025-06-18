const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('clientes', {
    id_cliente: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    apellido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dni: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "clientes_dni_key"
    },
    ciudad: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pais: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    telefono_oficina: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    telefono_casa: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    telefono_movil: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    notas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    empresa: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    nombre_empresa: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "activo"
    },
    fecha_alta: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    },
    calle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nro_casa: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    codigo_postal: {
      type: DataTypes.TEXT,
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
    tipo: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'clientes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clientes_dni_key",
        unique: true,
        fields: [
          { name: "dni" },
        ]
      },
      {
        name: "clientes_pkey",
        unique: true,
        fields: [
          { name: "id_cliente" },
        ]
      },
    ]
  });
};
