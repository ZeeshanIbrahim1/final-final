'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const appointmentTypeData = [
      {
        appointmentType: 'Vaccinations',
      },
      {
        appointmentType: 'Routine checkup',
      },
      {
        appointmentType: 'Other medical specialties',
      },
    ];

    await queryInterface.bulkInsert('AppointmentType', appointmentTypeData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AppointmentType', null, {});
  }
};
