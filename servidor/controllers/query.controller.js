const db = require("../database/db");
const Persona = require("../models/persona");

const query1 = (req, res) => {
  const { correo } = req.query;
  Persona.findAll({ where: { correo } }).then(response => {
    return res
      .status(200)
      .json({
        ok: true,
        data: response
      })
      .catch(error => {
        return res.status(500).json({
          ok: false,
          data: null,
          mensaje: `Error del servidor: ${error}`
        });
      });
  });
};

module.exports = {
  query1
};
