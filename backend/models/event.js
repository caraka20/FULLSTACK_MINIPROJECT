'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({cetak_tiket, kategori_event, kota, user}) {
      this.hasMany(cetak_tiket, {foreignKey: "event_id"})
      this.belongsTo(kategori_event, {foreignKey: "kategori_event_id"})
      this.belongsTo(kota, {foreignKey: "kota_id"})
      this.belongsTo(user, {foreignKey: "user_id"})
    }
  }
  event.init({
    nama_event: DataTypes.STRING,
    date: DataTypes.STRING,
    time: DataTypes.STRING,
    detail_lokasi: DataTypes.STRING,
    jenis_event: DataTypes.STRING,
    biaya: DataTypes.INTEGER,
    image_link: DataTypes.STRING,
    max_peserta: DataTypes.INTEGER,
    deskripsi_singkat: DataTypes.STRING,
    deskripsi_detail: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    createdAt : {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt : {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'event',
  });
  return event;
};