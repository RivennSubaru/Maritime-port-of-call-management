const express = require("express");
const {addEscale, getAllEscale} = require('../controllers/escales.controller');

const router = express.Router();

// POST
router.post('/add', addEscale);

// GET
router.get('/getAll', getAllEscale);

module.exports = router;