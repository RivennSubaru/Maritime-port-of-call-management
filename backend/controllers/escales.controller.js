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

// GET ALL ESCALE (with nomQuai & nomNavire)
const getAllEscale = asyncHandler(async (req, res) => {
    const sql = "SELECT `idEscale` AS `id`, `escale`.`idNav`, `nomNav`, `escale`.`idQuai`, `nomQuai`, `numEscale`, `ETD`, `ETA`, `provenance`, `destination`, `ATA`, `ATD`, `typeMouvement` FROM `escale` JOIN `navires` ON `escale`.`idNav` = `navires`.`idNav` JOIN `quais` ON `escale`.`idQuai` = `quais`.`idQuai`";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
})

module.exports = {addEscale, getAllEscale}