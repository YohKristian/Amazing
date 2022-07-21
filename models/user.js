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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email is required!"
        },
        notEmpty: {
          msg: "Email is required!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required!"
        },
        notEmpty: {
          msg: "Password is required!"
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role is required!"
        },
        notEmpty: {
          msg: "Role is required!"
        }
      }
    }
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