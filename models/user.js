"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Associations go here
      // User.hasOne(models.Profile, { foreignKey: 'user_id' });
      // User.hasOne(models.RecruiterProfile, { foreignKey: 'user_id' });
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },

      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      role: {
        type: DataTypes.ENUM("techie", "recruiter"),
        allowNull: false,
      },

      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      last_login: {
        type: DataTypes.DATE,
      },

      last_activity: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
      timestamps: true,
    }
  );

  return User;
};
