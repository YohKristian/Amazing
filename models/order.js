'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.UserProfile)
      Order.belongsTo(models.Product)
    }

    get formattedOrderStatus() {
      if (this.orderStatus) return "Order Completed"
      else return "Order is in progress"
    }
  }
  Order.init({
    orderStatus: DataTypes.BOOLEAN,
    buyStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Buyed stock is required!"
        },
        notEmpty: {
          msg: "Buyed stock is required!"
        }
      }
    },
    UserProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User Profile is required!"
        },
        notEmpty: {
          msg: "User Profile is required!"
        }
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product is required!"
        },
        notEmpty: {
          msg: "Product is required!"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (order, options) => {
        order.orderStatus = false;
      }
    },
    sequelize,
    modelName: 'Order',
  });
  return Order;
};