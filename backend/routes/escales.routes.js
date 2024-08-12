const express = require("express");
const {addEscale, getAllEscale, getCurrEscaleEntrant, getCurrEscaleSortant, getAllMonthEscale, getMonthEscalePrev, getMonthEscaleFin, getCountEscales, updateEscale} = require('../controllers/escales.controller');

const router = express.Router();

// POST
router.post('/add', addEscale);
router.post('/update', updateEscale);

// GET
router.get('/getAll', getAllEscale);
router.get('/getCurrEntrant', getCurrEscaleEntrant);
router.get('/getCurrSortant', getCurrEscaleSortant);
router.get('/getAllMonth', getAllMonthEscale);
router.get('/getMonthPrev', getMonthEscalePrev);
router.get('/getMonthFin', getMonthEscaleFin);
router.get('/getCount', getCountEscales);

module.exports = router;