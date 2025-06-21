require("dotenv").config();

module.exports = {
  development: {
    username: process.env.SUPABASE_USER,
    password: process.env.SUPABASE_PASSWORD,
    database: process.env.SUPABASE_DATABASE,
    host: process.env.SUPABASE_HOST,
    port: Number(process.env.SUPABASE_PORT),
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: process.env.SUPABASE_USER,
    password: process.env.SUPABASE_PASSWORD,
    database: process.env.SUPABASE_DATABASE,
    host: process.env.SUPABASE_HOST,
    port: Number(process.env.SUPABASE_PORT),
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.SUPABASE_USER,
    password: process.env.SUPABASE_PASSWORD,
    database: process.env.SUPABASE_DATABASE,
    host: process.env.SUPABASE_HOST,
    port: Number(process.env.SUPABASE_PORT),
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
