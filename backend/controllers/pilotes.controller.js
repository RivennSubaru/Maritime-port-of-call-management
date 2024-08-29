const asyncHandler = require('express-async-handler');
const db = require('../config/db');

// ADD PILOTE
const addPilote = asyncHandler(async (req, res) => {
    const  {nomPilote, prenomPilote, telPilote, emailPilote} = req.body;

    const sql = "INSERT INTO `pilotes` (`nomPilote`, `prenomPilote`, `telPilote`, `emailPilote`) VALUES (?, ?, ?, ?)";
    const values = [nomPilote, prenomPilote, telPilote, emailPilote];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Pilote ajouté"});
    })
})

// GET ALL PILOTE
const getAllPilote = asyncHandler(async (req, res) => {
    const sql = "SELECT `idPilote` AS id, `nomPilote`, `prenomPilote`, `telPilote`, `emailPilote` FROM `pilotes`";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
})

// UPDATE PILOTE
const updatePilote = asyncHandler(async (req, res) => {
    const {nomPilote, prenomPilote, telPilote, emailPilote, id} = req.body;

    const sql = "UPDATE `pilotes` SET `nomPilote`= ?, `prenomPilote`= ?, `telPilote` = ?, `emailPilote` = ? WHERE idPilote = ?";
    const values = [nomPilote, prenomPilote, telPilote, emailPilote, id];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Pilote modifié"});
    })
});

module.exports = {addPilote, getAllPilote, updatePilote};