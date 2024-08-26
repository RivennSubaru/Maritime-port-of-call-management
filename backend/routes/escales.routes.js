const express = require("express");
const {addEscale, getAllEscale, getCurrEscaleEntrant, getCurrEscaleSortant, getAllLateEscale, getLateEscaleEntrant, getLateEscaleSortant, getAllMonthEscale, getMonthEscalePrev, getMonthEscaleFin, getCountEscales, getFinEscalesPerDay, updateEscale, finishEscale, startEscale, deleteEscaleNav, deleteEscaleQuai} = require('../controllers/escales.controller');
const { protect, adminOnly } = require('../middlewares/authMiddleware')

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
router.get('/getAllLate', getAllLateEscale);
router.get('/getLateEntrant', getLateEscaleEntrant);
router.get('/getLateSortant', getLateEscaleSortant);
router.get('/getAllMonth', getAllMonthEscale);
router.get('/getMonthPrev', getMonthEscalePrev);
router.get('/getMonthFin', getMonthEscaleFin);
router.get('/getCount', protect, adminOnly, getCountEscales);
router.get('/getFinPerDay', protect, adminOnly, getFinEscalesPerDay);

// DELETE (only when deleting nav or quai)
router.delete("/nav/:id", deleteEscaleNav);
router.delete("/quai/:id", deleteEscaleQuai);

module.exports = router;