"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    static associate(models) {
      Follow.belongsTo(models.User, {
        foreignKey: "follower_id",
        as: "follower",
        onDelete: "CASCADE",
      });

      Follow.belongsTo(models.User, {
        foreignKey: "following_id",
        as: "following",
        onDelete: "CASCADE",
      });
    }
  }

  Follow.init(
    {
      follower_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
      following_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Follow",
      tableName: "follows",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    }
  );

  return Follow;
};
