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
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Insurance',
  });
  return Insurance;
};