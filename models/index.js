"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add Model files manually
db.User = require("./user")(sequelize, Sequelize);
db.Profile = require("./profile")(sequelize, Sequelize);
db.RecruiterProfile = require("./recruiterprofile")(sequelize, Sequelize);
db.EmploymentHistory = require("./employmenthistory")(sequelize, Sequelize);
db.AcademicHistory = require("./academichistory")(sequelize, Sequelize);
db.Project = require("./project")(sequelize, Sequelize);
db.Follow = require("./follow")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.Like = require("./like")(sequelize, Sequelize);
db.Skill = require("./skill")(sequelize, Sequelize);
db.Notification = require("./notification")(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// After importing/initializing all models as you did:

db.User.hasOne(db.Profile, { foreignKey: "user_id", as: "profile" });
db.Profile.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

db.User.hasMany(db.Skill, { foreignKey: "user_id", as: "skills" });
db.Skill.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

db.User.hasMany(db.EmploymentHistory, {
  foreignKey: "user_id",
  as: "employmentHistories",
});
db.EmploymentHistory.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

db.User.hasMany(db.AcademicHistory, {
  foreignKey: "user_id",
  as: "academicHistories",
});
db.AcademicHistory.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

db.User.hasMany(db.Project, { foreignKey: "user_id", as: "projects" });
db.Project.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

// Associate User with RecruiterProfile
db.User.hasOne(db.RecruiterProfile, {
  foreignKey: "user_id",
  as: "recruiterProfile",
  onDelete: "CASCADE",
});

db.RecruiterProfile.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
});
// Continue with other models associations if any

db.User.hasMany(db.Post, { foreignKey: "user_id", as: "posts" });
db.Post.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

// Post has many Comments
db.Post.hasMany(db.Comment, { foreignKey: "post_id", as: "comments" });
db.Comment.belongsTo(db.Post, { foreignKey: "post_id", as: "post" });

// Post has many Likes
db.Post.hasMany(db.Like, { foreignKey: "post_id", as: "likes" });
db.Like.belongsTo(db.Post, { foreignKey: "post_id", as: "post" });

// Comment belongs to a User
db.User.hasMany(db.Comment, { foreignKey: "user_id", as: "comments" });
db.Comment.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

module.exports = db;
