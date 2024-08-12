const express = require("express");
const {addEscale, getAllEscale, getCurrEscaleEntrant, updateEscale} = require('../controllers/escales.controller');

const router = express.Router();

// POST
router.post('/add', addEscale);
router.post('/update', updateEscale);

// GET
router.get('/getAll', getAllEscale);
router.get('/getCurrEntrant', getCurrEscaleEntrant)

module.exports = router;