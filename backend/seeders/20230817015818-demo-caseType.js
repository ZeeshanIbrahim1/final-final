'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const caseType = [
      {
        Name: 'Type Y',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Name: 'Type Z',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('CaseTypes', caseType, {});
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
