'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const caseType = [
      {
        Name: 'Type Y',  
      },
      {
        Name: 'Type Z',       
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
