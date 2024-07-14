const express = require("express");
const {addQuai, getAllQuai} = require("../controllers/quais.controller");

const router = express.Router();

// POST
// Add quai
router.post("/add", addQuai);

// Get quai
router.get("/getAll", getAllQuai);

module.exports = router;