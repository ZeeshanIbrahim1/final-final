'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Insurance extends Model {
    
    static associate(models) {
     
    }
  }
  Insurance.init({
    insuranceName: DataTypes.STRING,
    insuranceCity: DataTypes.STRING,
    insuranceState: DataTypes.STRING,
    insuranceZip: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Insurance',
  });
  return Insurance;
};