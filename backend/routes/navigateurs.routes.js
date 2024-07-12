const express = require("express");
const {addNavigateur, getAllNavigateur} = require("../controllers/navigateurs.controller");

const router = express.Router();

// POST
// Add navigateur
router.post("/add", addNavigateur);

// GET
// Get all navigators
router.get("/getAll", getAllNavigateur);

module.exports = router;