const express = require("express");

const router = express.Router();

const Menu = require("../models/menu");
const Pedido = require("../models/pedido");
const Persona = require("../models/persona");

router.get("/menu", (req, res) => {
  const { query } = req;
  Menu.findAll({ where: query })
    .then(menu => {
      res.json(menu);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/menu", (req, res, next) => {
  const datos = {
    foto: req.body.foto,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    fecha: req.body.fecha
  };

  if (!datos) {
    res.status(400);
    res,
      json({
        error: "Datos incorrectos"
      });
  } else {
    Menu.create(datos)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.json("error: " + err);
      });
  }
});

router.put("/menu", async (req, res) => {
  const { id } = req.query;
  const { foto, descripcion, precio, fecha } = req.body;
  const data = await Menu.findAll({
    atributes: ["id", "foto", "descripcion", "precio", "fecha"],
    where: {
      id
    }
  });

  if (data.length > 0) {
    data.forEach(async element => {
      await element.update({
        id,
        foto,
        descripcion,
        precio,
        fecha
      });
    });
  }
  return res.json({
    message: "actualizado",
    data: data
  });
});

router.delete("/menu", async (req, res) => {
  const { id } = req.query;
  const eliminar = await Menu.destroy({
    where: { id }
  });
  res.json({
    message: "eliminado",
    data: eliminar
  });
});

//personas
router.get("/persona", (req, res) => {
  const { query } = req;
  persons
    .findAll({ where: query })
    .then(personas => {
      res.json(personas);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/persona", (req, res, next) => {
  const datos = {
    nombre: req.body.nombre,
    correo: req.body.correo
  };

  if (!datos) {
    res.status(400);
    res,
      json({
        error: "Datos incorrectos"
      });
  } else {
    persons
      .create(datos)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.json("error: " + err);
      });
  }
});

router.put("/persona", async (req, res) => {
  const { id } = req.query;
  const { nombre, correo } = req.body;
  const data = await persons.findAll({
    atributes: ["id", "nombre", "correo"],
    where: {
      id
    }
  });

  if (data.length > 0) {
    data.forEach(async element => {
      await element.update({
        id,
        nombre,
        correo
      });
    });
  }
  return res.json({
    message: "actualizado",
    data: data
  });
});

router.delete("/persona", async (req, res) => {
  const { codigo } = req.query;
  const eliminar = await persons.destroy({
    where: { codigo }
  });
  res.json({
    message: "eliminado",
    data: eliminar
  });
});

//Pedido
router.get("/pedido", (req, res) => {
  const { query } = req;
  Pedido.findAll({ where: query })
    .then(pedido => {
      res.json(pedido);
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

router.post("/pedido", (req, res, next) => {
  const datos = {
    cantidad: req.body.cantidad,
    idpersona: req.body.idpersona,
    idmenu: req.body.idmenu
  };

  if (!datos) {
    res.status(400);
    res,
      json({
        error: "Datos incorrectos"
      });
  } else {
    Pedido.create(datos)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.json("error: " + err);
      });
  }
});

router.put("/pedido", async (req, res) => {
  const { id } = req.query;
  const { cantidad, idpersona, idmenu } = req.body;
  const data = await Pedido.findAll({
    atributes: ["cantidad", "idpersona", "idmenu"],
    where: {
      id
    }
  });

  if (data.length > 0) {
    data.forEach(async element => {
      await element.update({
        id,
        cantidad,
        idpersona,
        idmenu
      });
    });
  }
  return res.json({
    message: "actualizado",
    data: data
  });
});

router.delete("/pedido", async (req, res) => {
  const { id } = req.query;
  const eliminar = await Pedido.destroy({
    where: { id }
  });
  res.json({
    message: "eliminado",
    data: eliminar
  });
});

router.post("/login", (req, res, next) => {
  const correo = req.body.correo;
  const nombre = req.body.nombre;

  Persona.findAll().then(resultado => {
    resultado.forEach(element => {
      if (element.correo == correo && element.nombre == nombre) {
        res.status(200).json({
          ok: true,
          mensaje: "found"
        });
      }
      return res.status(500).json({
        ok: false,
        mensaje: "no-found"
      });
    });
  });
});

module.exports = router;
