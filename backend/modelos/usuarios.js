const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuarios', {
    id_usuario: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_usuario: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "usuarios_nombre_usuario_key"
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      unique: "usuarios_email_key"
    },
    hash_contrasena: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rol: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "mecanico"
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    apellido: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'usuarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "usuarios_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "usuarios_nombre_usuario_key",
        unique: true,
        fields: [
          { name: "nombre_usuario" },
        ]
      },
      {
        name: "usuarios_pkey",
        unique: true,
        fields: [
          { name: "id_usuario" },
        ]
      },
    ]
  });
};
