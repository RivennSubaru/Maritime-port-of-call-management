const express = require("express");
const {addEscale, getAllEscale, updateEscale} = require('../controllers/escales.controller');

const router = express.Router();

// POST
router.post('/add', addEscale);
router.post('/update', updateEscale);

// GET
router.get('/getAll', getAllEscale);

module.exports = router;