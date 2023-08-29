"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PurposeOfVisit extends Model {
    static associate(models) {}
  }
  PurposeOfVisit.init(
    {
      PurposeOfVisit: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PurposeOfVisit",
      timestamps: false
    }
  );
  return PurposeOfVisit;
};
