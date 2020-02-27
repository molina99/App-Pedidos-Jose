const Sequelize = require("sequelize");

const db = require("../database/db");
const Pedido = require("./pedido");

const Menu = db.sequelize.define("menus", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING
  },
  foto: {
    type: Sequelize.STRING
  },
  descripcion: {
    type: Sequelize.STRING
  },
  precio: {
    type: Sequelize.INTEGER
  },
  fecha: {
    type: Sequelize.STRING
  }
});

Menu.hasMany(Pedido, {
  foreignKey: "idmenu",
  sourceKey: "id"
});
Pedido.belongsTo(Menu, {
  foreignKey: "idmenu",
  sourceKey: "id"
});

module.exports = Menu;
