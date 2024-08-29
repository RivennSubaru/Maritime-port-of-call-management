const express = require("express");
const {addPilote, getAllPilote, updatePilote} = require("../controllers/pilotes.controller");

const router = express.Router();

// POST
router.post("/add", addPilote);
router.post("/update", updatePilote)

// GET
router.get("/getAll", getAllPilote);

module.exports = router;