const express = require("express");
const {addNavire, addNavireSousRequete, getAllNavires, getAllNaviresParti, getAllNaviresLibre, updateNavire, changeSituation, deleteNavire} = require("../controllers/navires.controller");

const router = express.Router();

// POST
router.post("/add", addNavire);
router.post("/addSousRequete", addNavireSousRequete);
router.post("/update", updateNavire);
router.post("/update/changeSituation", changeSituation);

// GET
router.get("/getAll", getAllNavires);
router.get("/getAllParti", getAllNaviresParti);
router.get("/getAllLibre", getAllNaviresLibre);

// DELETE
router.delete("/:id", deleteNavire);

module.exports = router;