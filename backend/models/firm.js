"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Firm extends Model {
    static associate(models) {}
  }
  Firm.init(
    {
      firmName: DataTypes.STRING,
      firmCity: DataTypes.STRING,
      firmState: DataTypes.STRING,
      firmZip: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Firm",
    }
  );
  return Firm;
};
