'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
      Product.hasMany(models.Order)
      Product.belongsToMany(models.UserProfile, {
        through: models.Order
      })
    }

    static formatPriceToIDR(price) {
      const formatIDR = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' });
      return formatIDR.format(price);
    }

    stockFormat() {
      return `Item di gudang : ${this.stock}`;
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product name is required!"
        },
        notEmpty: {
          msg: "Product name is required!"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Short description is required!"
        },
        notEmpty: {
          msg: "Short description is required!"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price is required!"
        },
        notEmpty: {
          msg: "Price is required!"
        },
        min: {
          args: 15000,
          msg: "Price minimum is 15000"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Stock is required!"
        },
        notEmpty: {
          msg: "Stock is required!"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image URL is required!"
        },
        notEmpty: {
          msg: "Image URL is required!"
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Category is required!"
        },
        notEmpty: {
          msg: "Category is required!"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};