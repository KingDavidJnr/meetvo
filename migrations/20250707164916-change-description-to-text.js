"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.changeColumn("employment_histories", "description", {
      type: Sequelize.TEXT,
      allowNull: true, // or false if it require a value
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.changeColumn("employment_histories", "description", {
      type: Sequelize.STRING(255),
      allowNull: true, // match previous state
    });
  },
};
