'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cetak_tiket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({user, event}) {
      this.belongsTo(user, {foreignKey: "user_id"})
      this.belongsTo(event, {foreignKey: "event_id"})
    }
  }
  cetak_tiket.init({
    kode_referal: DataTypes.STRING,
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
    modelName: 'cetak_tiket',
  });
  return cetak_tiket;
};