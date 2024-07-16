const asyncHandler = require('express-async-handler');
const db = require('../config/db');

// ADD QUAI
const addQuai = asyncHandler(async (req, res) => {
    const {nomQuai, emplacementQuai, profondeurQuai, longueurQuai} = req.body;

    const sql = "INSERT INTO `quais` (`idTypeQuai`, `nomQuai`, `emplacementQuai`, `profondeurQuai`, `longueursQuai`, `longueurDispo`, `isFull`) VALUES (? , ?, ?, ?, ?, ?, '0')";
    const values = [nomQuai, emplacementQuai, profondeurQuai, longueurQuai, longueurQuai];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Quai ajouté"});
    })
});

// GET ALL QUAI
const getAllQuai = asyncHandler(async (req, res) => {
    const sql = "SELECT idQuai, nomQuai AS nom, idTypeQuai, labelType AS type, emplacementQuai, profondeurQuai, longueurDispo, longueursQuai, isFull FROM quais JOIN types ON quais.idTypeQuai = types.idType";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});

// UPDATE QUAI
const updateQuai = asyncHandler(async (req, res) => {
    const {nom, idTypeQuai, emplacementQuai, profondeurQuai, longueursQuai, idQuai} = req.body;

    const sql = "UPDATE quais SET nomQuai = ?, idTypeQuai = ?, emplacementQuai = ?, profondeurQuai = ?, longueursQuai = ? WHERE idQuai = ?";
    const values = [nom, idTypeQuai, emplacementQuai, profondeurQuai, longueursQuai, idQuai];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Quai modifié"});
    })
});

module.exports = {addQuai, getAllQuai, updateQuai};