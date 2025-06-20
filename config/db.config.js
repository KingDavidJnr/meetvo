const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const database = process.env.SUPABASE_DATABASE;
const username = process.env.SUPABASE_USER;
const password = process.env.SUPABASE_PASSWORD;
const host = process.env.SUPABASE_HOST;
const port = process.env.SUPABASE_PORT || 5432;

const sequelize = new Sequelize(database, username, password, {
  dialect: "postgres",
  host,
  port,
  pool: {
    max: 20,
    min: 0,
    acquire: 60000,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database established successfully");
    return sequelize;
  } catch (error) {
    console.error("Connection to database failed:", error);
    throw error;
  }
};

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log("Database models synchronized successfully");
  } catch (error) {
    console.error("Database synchronization failed:", error);
    throw error;
  }
};

module.exports = {
  sequelize,
  connectDB,
  syncDB,
};
