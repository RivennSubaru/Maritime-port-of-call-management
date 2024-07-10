const express = require("express");
const {addQuai} = require("../controllers/quais.controller");

const router = express.Router();

// POST
// Add quai
router.post("/add", addQuai);

module.exports = router;