'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const firmsData = [
      {
        firmName: 'ABC Law Firm',
        firmCity: 'New York',
        firmState: 'NY',
        firmZip: '10001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firmName: 'XYZ Legal Services',
        firmCity: 'Los Angeles',
        firmState: 'CA',
        firmZip: '90001',
        updatedAt: new Date(),
        createdAt: new Date()
      },
    ];

    await queryInterface.bulkInsert('Firms', firmsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Firms', null, {});
  }
};
