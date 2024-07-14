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
    const sql = "SELECT nomQuai, labelType AS type, emplacementQuai, profondeurQuai, longueurDispo FROM quais JOIN types ON quais.idTypeQuai = types.idType";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
})

module.exports = {addQuai, getAllQuai};