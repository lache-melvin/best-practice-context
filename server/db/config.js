const path = require("path");

module.exports = {
  development: {
    dialect: "sqlite",
    storage: path.join(__dirname, "dev.sqlite3"),
  },
  test: {
    dialect: "sqlite",
    storage: ":memory:",
  },
  production: {
    dialect: "postgres",
    host: "127.0.0.1",
    database: "database_production",
    username: "root",
    password: null,
  },
};
