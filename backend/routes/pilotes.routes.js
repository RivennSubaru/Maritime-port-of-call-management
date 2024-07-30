const express = require("express");
const {addPilote, getAllPilote} = require("../controllers/pilotes.controller");

const router = express.Router();

// POST
// Add pilote
router.post("/add", addPilote);

// GET
// Get all pilote
router.get("/getAll", getAllPilote);

module.exports = router;