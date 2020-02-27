const Menu = require("../models/menu");

const getMenu = (req, res) => {
  const { query } = req;
  Menu.findAll({ where: query })
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

async function createMenu(req, res) {
  const { nombre, foto, descripcion, precio, fecha } = req.body;
  try {
    let newMenu = await Menu.create(
      {
        nombre,
        foto,
        descripcion,
        precio,
        fecha
      },
      {
        fields: ["nombre", "foto", "descripcion", "precio", "fecha"]
      }
    );
    if (newMenu) {
      res.json({
        message: "Menu created successfully",
        data: newMenu
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

async function deleteMenu(req, res) {
  const { id } = req.params;
  const deleteMenu = await Menu.destroy({
    where: {
      id
    }
  });
  res.json({
    message: "Menu deleted succesfully",
    count: deleteMenu
  });
}

async function updateMenu(req, res) {
  const { id } = req.params;
  const { nombre, foto, descripcion, precio, fecha } = req.body;
  const menus = await Menu.findAll({
    attributes: ["id", "nombre", "foto", "descripcion", "precio", "fecha"],
    where: {
      id
    }
  });

  if (menus.length > 0) {
    menus.forEach(async user => {
      await user.update({
        nombre,
        foto,
        descripcion,
        precio,
        fecha
      });
    });
  }
  return res.json({
    message: "Menu updated succesfully",
    data: menus
  });
}

module.exports = {
  getMenu,
  createMenu,
  deleteMenu,
  updateMenu
};
