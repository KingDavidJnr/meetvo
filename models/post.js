"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
      });

      Post.hasMany(models.Comment, {
        foreignKey: "post_id",
        as: "comments",
        onDelete: "CASCADE",
      });

      Post.hasMany(models.Like, {
        foreignKey: "post_id",
        as: "likes",
        onDelete: "CASCADE",
      });
    }
  }

  Post.init(
    {
      post_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        validate: {
          len: {
            args: [0, 100 * 7],
            msg: "Post content cannot exceed 100 words",
          },
        },
      },
      is_edited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      underscored: true,
      timestamps: true,
    }
  );

  return Post;
};
