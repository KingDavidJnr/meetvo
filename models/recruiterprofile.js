"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RecruiterProfile extends Model {
    static associate(models) {
      // Associate RecruiterProfile with User
      RecruiterProfile.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        as: "user",
      });
    }
  }

  RecruiterProfile.init(
    {
      recruiter_profile_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
      },

      company_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      recruiter_title: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      company_website: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      linkedin_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      company_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      is_visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "RecruiterProfile",
      tableName: "recruiter_profiles",
      underscored: true,
    }
  );

  return RecruiterProfile;
};
