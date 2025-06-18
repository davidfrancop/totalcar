const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('empresas', {
    id_empresa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre_empresa: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id_fiscal: {
      type: DataTypes.TEXT,
      allowNull: true
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
    telefono: {
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
      defaultValue: "activo"
    },
    fecha_alta: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE')
    },
    persona_contacto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email_contacto: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    telefono_contacto: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'empresas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "empresas_pkey",
        unique: true,
        fields: [
          { name: "id_empresa" },
        ]
      },
    ]
  });
};
