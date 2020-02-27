const Sequelize = require("sequelize");
const db = require("../database/db");

const Pedido = require("./pedido");

const Persona = db.sequelize.define("personas", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: Sequelize.STRING
  },
  correo: {
    type: Sequelize.STRING
  }
});

Persona.hasMany(Pedido, {
  foreignKey: "idpersona",
  sourceKey: "id"
});
Pedido.belongsTo(Persona, {
  foreignKey: "idpersona",
  sourceKey: "id"
});

module.exports = Persona;
