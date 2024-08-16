const express = require("express");
const {addQuai, getAllQuai, updateQuai, changeLongDispo, deleteQuai} = require("../controllers/quais.controller");

const router = express.Router();

// POST
router.post("/add", addQuai);
router.post("/update", updateQuai);
router.post("/update/changeLongDispo", changeLongDispo);

// GET
router.get("/getAll", getAllQuai);

// DELETE
router.delete("/:id", deleteQuai);

module.exports = router;