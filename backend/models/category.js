
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // Define associations if needed
    }
  }
  Category.init({
    categoryName: DataTypes.STRING,
    categoryType: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
