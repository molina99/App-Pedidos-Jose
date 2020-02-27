const Persona = require("../models/persona");

const getPersona = (req, res) => {
  const { query } = req;
  Persona.findAll({ where: query })
    .then(response => {
      return res.status(200).json({
        ok: true,
        data: response
      });
    })
    .catch(error => {
      return res.status(500).json({
        ok: false,
        data: null,
        mensaje: `Error del servidor: ${error}`
      });
    });
};

async function createPersona(req, res) {
  const { nombre, correo } = req.body;
  try {
    let newPersona = await Persona.create(
      {
        nombre,
        correo
      },
      {
        fields: ["nombre", "correo"]
      }
    );
    if (newPersona) {
      res.json({
        message: "Persona created successfully",
        data: newPersona
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
      data: {}
    });
  }
}

async function deletePersona(req, res) {
  const { id } = req.params;
  const deletePersona = await Persona.destroy({
    where: {
      id
    }
  });
  res.json({
    message: "Persona deleted succesfully",
    count: deletePersona
  });
}

async function updatePersona(req, res) {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  const personas = await Persona.findAll({
    attributes: ["id", "nombre", "correo"],
    where: {
      id
    }
  });

  if (personas.length > 0) {
    personas.forEach(async user => {
      await user.update({
        nombre,
        correo
      });
    });
  }
  return res.json({
    message: "Menu updated succesfully",
    data: personas
  });
}

module.exports = {
  getPersona,
  createPersona,
  deletePersona,
  updatePersona
};
