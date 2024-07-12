const express = require("express");
const {addNavire, addNavireSousRequete} = require("../controllers/navires.controller");

const router = express.Router();

// POST
// Add Navire
router.post("/add", addNavire);
router.post("/addSousRequete", addNavireSousRequete);

module.exports = router;