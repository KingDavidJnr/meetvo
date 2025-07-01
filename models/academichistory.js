"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AcademicHistory extends Model {
    static associate(models) {
      AcademicHistory.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  AcademicHistory.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      institution: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      degree: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      start_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      end_year: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "AcademicHistory",
      tableName: "academic_histories",
      underscored: true,
    }
  );

  return AcademicHistory;
};
