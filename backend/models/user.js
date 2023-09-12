'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({cetak_tiket, comment, event}) {
      this.hasMany(cetak_tiket, {foreignKey: "user_id"})
      this.hasMany(comment, {foreignKey: "user_id"})
      this.hasMany(event, {foreignKey: "user_id"})
    }
  }
  
  user.init({
    nama_lengkap: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    saldo: DataTypes.INTEGER,
    point: DataTypes.INTEGER,
    code: DataTypes.STRING,
    status: DataTypes.STRING,
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
    modelName: 'user',
  });
  return user;
};