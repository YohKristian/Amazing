'use strict';
const fs = require('fs');

module.exports = {
  up (queryInterface, Sequelize) {
    const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"));
    const value = products.map(el => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      el.imageUrl = "https://ds393qgzrxwzn.cloudfront.net/resize/m500x500/cat1/img/images/0/Tr0sfS9AXx.jpg";
      return el;
    });
    return queryInterface.bulkInsert("Products", value, {});
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
    return queryInterface.bulkDelete("Products", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
