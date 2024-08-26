const express = require("express");
const {addQuai, getAllQuai, updateQuai, getAllQuaiOccupation, deleteQuai} = require("../controllers/quais.controller");

const router = express.Router();

// POST
router.post("/add", addQuai);
router.post("/update", updateQuai);

// GET
router.get("/getAll", getAllQuai);
router.get("/getAllOccup", getAllQuaiOccupation);

// DELETE
router.delete("/:id", deleteQuai);

module.exports = router;