const Pedido = require("../models/pedido");

const getPedido = (req, res) => {
  const { query } = req;
  Pedido.findAll({ where: query })
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

async function createPedido(req, res) {
  const { idpersona, idmenu, cantidad } = req.body;
  try {
    let newPedido = await Pedido.create(
      {
        idpersona,
        idmenu,
        cantidad
      },
      {
        fields: ["idpersona", "idmenu", "cantidad"]
      }
    );
    if (newPedido) {
      res.json({
        message: "Pedido created successfully",
        data: newPedido
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

async function deletePedido(req, res) {
  const { id } = req.params;
  const deletePedido = await Pedido.destroy({
    where: {
      id
    }
  });
  res.json({
    message: "Pedido deleted succesfully",
    count: deletePedido
  });
}

async function updatePedido(req, res) {
  const { id } = req.params;
  const { idpersona, idmenu, cantidad } = req.body;
  const pedidos = await Pedido.findAll({
    attributes: ["id", "idpersona", "idmenu", "cantidad"],
    where: {
      id
    }
  });

  if (pedidos.length > 0) {
    pedidos.forEach(async user => {
      await user.update({
        idpersona,
        idmenu,
        cantidad
      });
    });
  }
  return res.json({
    message: "Menu updated succesfully",
    data: pedidos
  });
}

module.exports = {
  getPedido,
  createPedido,
  deletePedido,
  updatePedido
};
