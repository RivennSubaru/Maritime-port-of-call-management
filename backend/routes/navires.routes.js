const express = require("express");
const {addNavire, addNavireSousRequete, getAllNavires, updateNavire, deleteNavire} = require("../controllers/navires.controller");

const router = express.Router();

// POST
router.post("/add", addNavire);
router.post("/addSousRequete", addNavireSousRequete);
router.post("/update", updateNavire);

// GET
router.get("/getAll", getAllNavires);

// DELETE
router.delete("/:id", deleteNavire);

module.exports = router;