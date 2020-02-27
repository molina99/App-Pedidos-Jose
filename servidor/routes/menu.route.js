const express = require("express");
const router = express.Router();

const {
  getMenu,
  createMenu,
  deleteMenu,
  updateMenu
} = require("../controllers/menu.controller");

router.get("/getMenu", getMenu);
router.post("/createMenu", createMenu);
router.delete("/deleteMenu/:id", deleteMenu);
router.put("/updateMenu/:id", updateMenu);

module.exports = router;
