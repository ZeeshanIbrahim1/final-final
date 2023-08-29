"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {}
  }
  Appointment.init(
    {
      appointmentDate: DataTypes.DATE,
      appointmentTime: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      deleted: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Appointment",
      timestamps: false
    }
  );
  return Appointment;
};
