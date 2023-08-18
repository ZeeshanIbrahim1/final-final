'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const specialtiesData = [
      {
        name: 'Cardiology',
        
        
      },
      {
        name: 'Dermatology',
        
        
      },
      {
        name: 'Orthopedics',
        
        
      },
    ];

    await queryInterface.bulkInsert('Specialties', specialtiesData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Specialties', null, {});
  }
};
