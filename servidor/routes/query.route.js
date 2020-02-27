const express = require("express");
const router = express.Router();

const query1 = require("../controllers/query.controller");

router.get("/query1", query1.query1);

module.exports = router;
