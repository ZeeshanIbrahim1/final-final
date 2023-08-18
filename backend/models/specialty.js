'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    static associate(models) {}
  }
  Specialty.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Specialty',
    timestamps: false
  });
  return Specialty;
};