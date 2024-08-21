const express = require('express');
const {addChange, removeChange, deleteChangeNav, deleteChangeQuai} = require('../controllers/changements.controller');

const router = express.Router();

// POST
router.post("/add", addChange);
router.post("/remove", removeChange); // Also delete but it's the specific one

// DELETE
router.delete("/nav/:id", deleteChangeNav);
router.delete("/quai/:id", deleteChangeQuai);

module.exports = router;