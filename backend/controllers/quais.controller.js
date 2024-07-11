const asyncHandler = require('express-async-handler');
const db = require('../config/db');

// ADD QUAI
const addQuai = asyncHandler(async (req, res) => {
    const {nomQuai, emplacementQuai, profondeurQuai, longueurQuai} = req.body;

    const sql = "INSERT INTO quais(nomQuai, emplacementQuai, profondeurQuai, longueursQuai, longueurDispo, statutQuai) VALUES(?, ?, ?, ?, ?, ?)";
    const values = [nomQuai, emplacementQuai, profondeurQuai, longueurQuai, longueurQuai, 1];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Quai ajouté"});
    })
})

module.exports = {addQuai};