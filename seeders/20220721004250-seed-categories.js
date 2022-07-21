'use strict';
const fs = require('fs');

module.exports = {
  up (queryInterface, Sequelize) {
    const categories = JSON.parse(fs.readFileSync("./data/categories.json", "utf-8"));
    const value = categories.map(el => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    return queryInterface.bulkInsert("Categories", value, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Categories", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
