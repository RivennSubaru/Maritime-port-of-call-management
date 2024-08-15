const express = require("express");
const {addQuai, getAllQuai, updateQuai, addNavire, deleteQuai} = require("../controllers/quais.controller");

const router = express.Router();

// POST
router.post("/add", addQuai);
router.post("/update", updateQuai);
router.post("/update/addNavire", addNavire);

// GET
router.get("/getAll", getAllQuai);

// DELETE
router.delete("/:id", deleteQuai);

module.exports = router;