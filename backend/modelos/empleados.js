const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('empleados', {
    id_empleado: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'empresas',
        key: 'id_empresa'
      }
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
      unique: "empleados_dni_key"
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: true
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
    estado: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "activo"
    },
    fecha_alta: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    }
  }, {
    sequelize,
    tableName: 'empleados',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "empleados_dni_key",
        unique: true,
        fields: [
          { name: "dni" },
        ]
      },
      {
        name: "empleados_pkey",
        unique: true,
        fields: [
          { name: "id_empleado" },
        ]
      },
    ]
  });
};
