'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_event: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      detail_lokasi: {
        type: Sequelize.STRING
      },
      jenis_event: {
        type: Sequelize.STRING
      },
      biaya: {
        type: Sequelize.INTEGER
      },
      image_link: {
        type: Sequelize.STRING
      },
      max_peserta: {
        type: Sequelize.INTEGER
      },
      deskripsi_singkat: {
        type: Sequelize.STRING
      },
      deskripsi_detail: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  }
};