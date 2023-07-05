// TODO: Crear modelo de datos de Reserva

const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");

const Reserva = sequelize.define(
  "reserva",
  {
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "Reserva",
  }
);

Reserva.sync({ force: false });

module.exports = Reserva;