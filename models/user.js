'use strict';
const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile)
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user, options) {
        const salt = bcrypt.genSaltSync(5);
        const hash = bcrypt.hashSync(user.password, salt);

        user.password = hash;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};