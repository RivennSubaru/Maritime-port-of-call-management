const express = require('express');
const {getAllUser, registerUser, loginUser, deleteUser} = require('../controllers/users.controller');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();


// INSCRIPTION || POST
router.post("/inscription", registerUser);

// LOGIN || POST
router.post("/login", loginUser);

// GET
router.get("/getAll", protect, adminOnly, getAllUser);

// DELETE
router.delete("/:id", deleteUser)
module.exports = router;