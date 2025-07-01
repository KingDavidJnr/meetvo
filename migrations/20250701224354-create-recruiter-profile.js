"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("recruiter_profiles", {
      recruiter_profile_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true,
        references: {
          model: "users",
          key: "user_id",
        },
        onDelete: "CASCADE",
      },

      company_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      recruiter_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      company_website: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      linkedin_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      company_description: {
        type: Sequelize.TEXT,
        allowNull: true,
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
    await queryInterface.dropTable("recruiter_profiles");
  },
};
