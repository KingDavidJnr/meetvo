"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("profiles", {
      profile_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },

      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      title: {
        type: Sequelize.STRING,
      },

      country: {
        type: Sequelize.STRING,
      },

      website: {
        type: Sequelize.STRING,
      },

      linkedin_url: {
        type: Sequelize.STRING,
      },

      github_url: {
        type: Sequelize.STRING,
      },

      x_url: {
        type: Sequelize.STRING,
      },

      resume_url: {
        type: Sequelize.STRING,
      },

      description: {
        type: Sequelize.TEXT,
      },

      is_visible: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("profiles");
  },
};
