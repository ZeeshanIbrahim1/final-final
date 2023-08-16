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
      appointmentType: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Appointment",
    }
  );
  return Appointment;
};
