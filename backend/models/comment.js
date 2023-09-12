'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
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
  comment.init({
    comment: DataTypes.STRING,
    rate: DataTypes.INTEGER,
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
    modelName: 'comment',
  });
  return comment;
};