'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categoriesData = [
      {
        categoryName: 'Category A',
        categoryType: 'Type A',
        
        
      },
      {
        categoryName: 'Category B',
        categoryType: 'Type B',
        
        
      },
    ];

    await queryInterface.bulkInsert('Categories', categoriesData, {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('Categories', null, {});
  }
};
