'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
      UserProfile.hasMany(models.Order)
      UserProfile.belongsToMany(models.Product, {
        through: models.Order
      })
    }
  }
  UserProfile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required!"
        },
        notEmpty: {
          msg: "Name is required!"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required!"
        },
        notEmpty: {
          msg: "Name is required!"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone number is required!"
        },
        notEmpty: {
          msg: "Phone number is required!"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User ID is required!"
        },
        notEmpty: {
          msg: "User ID is required!"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};