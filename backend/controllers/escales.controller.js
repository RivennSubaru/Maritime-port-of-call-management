const asyncHandler = require('express-async-handler');
const db = require('../config/db');

// ADD ESCALE
const addEscale = asyncHandler(async (req, res) => {
    const {idNav, idQuai, numEscale, ETD, ETA, provenance, destination, typeMouvement} = req.body;

    const sql = "INSERT INTO `escale`(`idNav`, `idQuai`, `numEscale`, `ETD`, `ETA`, `provenance`, `destination`, `typeMouvement`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [idNav, idQuai, numEscale, ETD, ETA, provenance, destination, typeMouvement];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Escale ajouté"});
    })
});

module.exports = {addEscale}