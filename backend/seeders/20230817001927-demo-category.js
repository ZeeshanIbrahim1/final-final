'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categoriesData = [
      {
        categoryName: 'Category A',
        categoryType: 'Type A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: 'Category B',
        categoryType: 'Type B',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Categories', categoriesData, {});
  },

  async down (queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('Categories', null, {});
  }
};
