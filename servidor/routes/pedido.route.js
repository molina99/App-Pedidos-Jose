const express = require("express");
const router = express.Router();

const {
  getPedido,
  createPedido,
  deletePedido,
  updatePedido
} = require("../controllers/pedido.controller");

router.get("/getPedido", getPedido);
router.post("/createPedido", createPedido);
router.delete("/deletePedido/:id", deletePedido);
router.put("/updatePedido/:id", updatePedido);

module.exports = router;
