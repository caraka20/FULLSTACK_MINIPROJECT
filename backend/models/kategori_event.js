'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kategori_event extends Model {
    static associate({event}) {
      this.hasMany(event, {foreignKey: "kategori_event_id"})
    }
  }

  kategori_event.init({
    nama_kategori: DataTypes.STRING,
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
    modelName: 'kategori_event',
  });
  return kategori_event;
};