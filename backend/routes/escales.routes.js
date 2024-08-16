const express = require("express");
const {addEscale, getAllEscale, getCurrEscaleEntrant, getCurrEscaleSortant, getAllMonthEscale, getMonthEscalePrev, getMonthEscaleFin, getCountEscales, getFinEscalesPerDay, updateEscale, finishEscale, startEscale} = require('../controllers/escales.controller');

const router = express.Router();

// POST
router.post('/add', addEscale);
router.post('/update', updateEscale);
router.post('/update/start', startEscale);
router.post('/update/finish', finishEscale);

// GET
router.get('/getAll', getAllEscale);
router.get('/getCurrEntrant', getCurrEscaleEntrant);
router.get('/getCurrSortant', getCurrEscaleSortant);
router.get('/getAllMonth', getAllMonthEscale);
router.get('/getMonthPrev', getMonthEscalePrev);
router.get('/getMonthFin', getMonthEscaleFin);
router.get('/getCount', getCountEscales);
router.get('/getFinPerDay', getFinEscalesPerDay);

module.exports = router;