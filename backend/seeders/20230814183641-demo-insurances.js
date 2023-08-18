'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const insurancesData = [
      {
        insuranceName: 'Blue Cross Blue Shield',
        insuranceCity: 'NYC',
        insuranceState: 'NY',
        insuranceZip: '01001',      
      },
      {
        insuranceName: 'Aetna',
        insuranceCity: 'CityA',
        insuranceState: 'StateA',
        insuranceZip: '09902',
      },
    ];

    await queryInterface.bulkInsert('Insurances', insurancesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Insurances', null, {});

  }
};
