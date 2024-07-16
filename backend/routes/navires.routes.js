const express = require("express");
const {addNavire, addNavireSousRequete, getAllNavires} = require("../controllers/navires.controller");

const router = express.Router();

// POST
router.post("/add", addNavire);
router.post("/addSousRequete", addNavireSousRequete);

// GET
router.post("/getAll", getAllNavires);

module.exports = router;