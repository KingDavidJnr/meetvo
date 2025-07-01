"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });

      Like.belongsTo(models.Post, {
        foreignKey: "post_id",
        as: "post",
        onDelete: "CASCADE",
      });
    }
  }

  Like.init(
    {
      user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },

      post_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Like",
      tableName: "likes",
      underscored: true,
      timestamps: true,
      updatedAt: false,
      createdAt: "created_at",
    }
  );

  return Like;
};
