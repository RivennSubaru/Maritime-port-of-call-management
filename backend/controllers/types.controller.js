const asyncHandler = require('express-async-handler');
const db = require('../config/db');

// Get all
const getAllTypes = asyncHandler(async (req, res) => {
    const sql = 'SELECT * FROM types';

    db.query(sql, (err, data) => {
        if (err) {
            res.status(500).send({error: err.message});
            return;
        }
        res.status(201).send(data)
    });
})

module.exports = {getAllTypes}