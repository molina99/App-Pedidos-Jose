const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize("appjose", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
  define: {
    timestamps: false
  },
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
