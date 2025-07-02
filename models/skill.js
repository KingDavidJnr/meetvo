"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    static associate(models) {
      Skill.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }

  Skill.init(
    {
      skill_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Skill",
      tableName: "skills",
      underscored: true,
    }
  );

  return Skill;
};
