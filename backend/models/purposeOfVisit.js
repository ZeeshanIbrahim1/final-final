"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PurposeOfVisit extends Model {
    static associate(models) {}
  }
  PurposeOfVisit.init(
    {
      PurposeOfVisit: DataTypes.STRING,
      deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "PurposeOfVisit",
      timestamps: false
    }
  );
  return PurposeOfVisit;
};
