'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderStatus: {
        type: Sequelize.BOOLEAN
      },
      buyStock: {
        type: Sequelize.INTEGER
      },
      UserProfileId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserProfiles',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      ProductId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Orders');
  }
};