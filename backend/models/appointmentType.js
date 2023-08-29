"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AppointmentType extends Model {
    static associate(models) {}
  }
  AppointmentType.init(
    {
      appointmentType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AppointmentType",
      tableName: "AppointmentType",
      timestamps: false
    }
  );
  return AppointmentType;
};
