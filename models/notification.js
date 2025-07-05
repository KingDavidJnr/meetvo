"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      // Notification belongs to a User (receiver)
      Notification.belongsTo(models.User, {
        foreignKey: "receiver_id",
        as: "receiver",
      });
    }
  }

  Notification.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      receiver_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["follow", "like", "comment"]], // To add more types later
        },
      },
      entity_id: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "Could be post_id, comment_id, etc depending on type",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Notification",
      tableName: "notifications",
      updatedAt: false,
      underscored: true,
    }
  );

  return Notification;
};
