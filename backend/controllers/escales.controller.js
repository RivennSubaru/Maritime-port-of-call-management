const asyncHandler = require('express-async-handler');
const db = require('../config/db');

// ADD ESCALE
const addEscale = asyncHandler(async (req, res) => {
    const {idNav, idQuai, numEscale, ETD, ETA, provenance, destination, typeMouvement, etatEscale} = req.body;

    const sql = "INSERT INTO `escales`(`idNav`, `idQuai`, `numEscale`, `ETD`, `ETA`, `provenance`, `destination`, `typeMouvement`, `etatEscale`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [idNav, idQuai, numEscale, ETD, ETA, provenance, destination, typeMouvement, etatEscale];

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
    const sql = "SELECT `idEscale` AS `id`, `escales`.`idNav`, `nomNav`, `escales`.`idQuai`, `nomQuai`, `numEscale`, `ETD`, `ETA`, `provenance`, `destination`, `ATA`, `ATD`, `typeMouvement`, `etatEscale` FROM `escales` JOIN `navires` ON `escales`.`idNav` = `navires`.`idNav` JOIN `quais` ON `escales`.`idQuai` = `quais`.`idQuai`";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
})

// UPDATE ESCALE
const updateEscale = asyncHandler(async (req, res) => {
    const {idNav, idQuai, numEscale, ETD, ETA, provenance, destination, typeMouvement, etatEscale, id} = req.body;

    const sql = "UPDATE escales SET idNav = ?, idQuai = ?, numEscale = ?, ETD = ?, ETA = ?, provenance = ?, destination = ?, typeMouvement = ?, etatEscale = ? WHERE idEscale = ?";
    const values = [idNav, idQuai, numEscale, ETD, ETA, provenance, destination, typeMouvement, etatEscale, id];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Escale modifiée"});
    })
});

module.exports = {addEscale, getAllEscale, updateEscale}