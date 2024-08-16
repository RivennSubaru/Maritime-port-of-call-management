const express = require('express');
const {addChange} = require('../controllers/changements.controller');

const router = express.Router();

// POST
router.post("/add", addChange);

// GET

module.exports = router;