const express = require("express");
const {getAllTypes} = require("../controllers/types.controller");

const router = express.Router();

// GET
// getAll types
router.get("/getAll", getAllTypes);

module.exports = router;