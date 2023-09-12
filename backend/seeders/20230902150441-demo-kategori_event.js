'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kategori_events', [
      {
      id : 1,
      nama_kategori : "Anime"
      },
      {
      id : 2,
      nama_kategori : "Seni"
      },
      {
      id : 3,
      nama_kategori : "Olahraga"
      },
      {
      id : 4,
      nama_kategori : "Komedi"
      },
      {
      id : 5,
      nama_kategori : "Edukasi"
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('kategori_events', null, {});
  }
};
