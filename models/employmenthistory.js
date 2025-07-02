"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EmploymentHistory extends Model {
    /**
     * Define associations
     */
    static associate(models) {
      EmploymentHistory.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }

  EmploymentHistory.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: false,
      },

      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING,
      },

      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      end_date: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "EmploymentHistory",
      tableName: "employment_histories",
      timestamps: true,
      underscored: true,
    }
  );

  return EmploymentHistory;
};
