const express = require("express");
const {addEscale} = require('../controllers/escales.controller');

const router = express.Router();

// POST
router.post('/add', addEscale);

module.exports = router;