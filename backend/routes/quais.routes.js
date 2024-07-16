const express = require("express");
const {addQuai, getAllQuai, updateQuai, deleteQuai} = require("../controllers/quais.controller");

const router = express.Router();

// POST
router.post("/add", addQuai);
router.post("/update", updateQuai);

// GET
router.get("/getAll", getAllQuai);

// DELETE
router.delete("/:idQuai", deleteQuai);

module.exports = router;