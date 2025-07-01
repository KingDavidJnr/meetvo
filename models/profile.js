"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });
    }
  }

  Profile.init(
    {
      profile_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },

      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      linkedin_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      github_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      x_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      resume_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      description: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [0, 200 * 6], // ~200 words max (roughly 6 characters per word)
            msg: "Description cannot exceed 200 words",
          },
        },
      },

      is_visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Profile",
      tableName: "profiles",
      underscored: true,
      timestamps: true,
    }
  );

  return Profile;
};
