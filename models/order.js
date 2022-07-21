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
  }
  Order.init({
    orderStatus: DataTypes.BOOLEAN,
    buyStock: DataTypes.INTEGER,
    UserProfileId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER
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