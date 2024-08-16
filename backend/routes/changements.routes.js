const express = require('express');
const {addChange, removeChange} = require('../controllers/changements.controller');

const router = express.Router();

// POST
router.post("/add", addChange);
router.post("/remove", removeChange);

// GET

module.exports = router;