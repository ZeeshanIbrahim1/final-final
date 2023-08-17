'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CaseType extends Model {
    static associate(models) {
      // define association here
    }
  }
  CaseType.init({
    Name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'CaseType',
  });
  return CaseType;
};