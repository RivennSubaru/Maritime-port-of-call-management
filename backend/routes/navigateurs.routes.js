const express = require("express");
const {addNavigateur} = require("../controllers/navigateurs.controller");

const router = express.Router();

// POST
// Add navigateur
router.post("/add", addNavigateur);

module.exports = router;