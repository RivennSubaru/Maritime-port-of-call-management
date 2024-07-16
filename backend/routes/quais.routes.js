const express = require("express");
const {addQuai, getAllQuai, updateQuai} = require("../controllers/quais.controller");

const router = express.Router();

// POST
// Add quai
router.post("/add", addQuai);
//update quai
router.post("/update", updateQuai);

// Get quai
router.get("/getAll", getAllQuai);

module.exports = router;