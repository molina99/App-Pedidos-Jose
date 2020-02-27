const Sequelize = require("sequelize");
const db = require("../database/db");

const Pedido = db.sequelize.define("pedidos", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idpersona: {
    type: Sequelize.INTEGER
  },
  idmenu: {
    type: Sequelize.INTEGER
  },
  cantidad: {
    type: Sequelize.INTEGER
  }
});

module.exports = Pedido;
