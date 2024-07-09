const express = require('express');
const {registerUser, loginUser} = require('../controllers/users.controller');

const router = express.Router();

// INSCRIPTION || POST
router.post("/inscription", registerUser);

// LOGIN || POST
router.post("/login", loginUser);

module.exports = router;