const express = require("express");
const router = express.Router();

const {
  getPersona,
  createPersona,
  deletePersona,
  updatePersona
} = require("../controllers/persona.controller");

router.get("/getPersona", getPersona);
router.post("/createPersona", createPersona);
router.delete("/deletePersona/:id", deletePersona);
router.put("/updatePersona/:id", updatePersona);

module.exports = router;
