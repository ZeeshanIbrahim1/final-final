'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const appointmentTypeData = [
      {
        appointmentType: 'Vaccinations',
        deleted: false,
      },
      {
        appointmentType: 'Routine checkup',
        deleted: false,
      },
      {
        appointmentType: 'Other medical specialties',
        deleted: false,
      },
    ];

    await queryInterface.bulkInsert('AppointmentType', appointmentTypeData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AppointmentType', null, {});
  }
};
