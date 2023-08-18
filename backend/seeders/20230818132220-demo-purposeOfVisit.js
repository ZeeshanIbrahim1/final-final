'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const purposeOfVisitData = [
      {
        PurposeOfVisit: 'Routine checkup',
      },
      {
        PurposeOfVisit: 'Consultation',
      },
      {
        PurposeOfVisit: 'Follow-up',
      },
      // Add more data as needed
    ];

    await queryInterface.bulkInsert('PurposeOfVisits', purposeOfVisitData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PurposeOfVisits', null, {});
  }
};
