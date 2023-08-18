'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    static associate(models) {
    }
  }
  Doctor.init({
    first_name: DataTypes.STRING,
    middle_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Doctors',
    timestamps: false
  });
  return Doctor;
};