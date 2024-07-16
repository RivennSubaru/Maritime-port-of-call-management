const asyncHandler = require('express-async-handler');
const db = require('../config/db');

// ADD QUAI
const addQuai = asyncHandler(async (req, res) => {
    const {nom, emplacementQuai, idType, profondeurQuai, longueursQuai} = req.body;

    const sql = "INSERT INTO `quais` (nomQuai, emplacementQuai, idTypeQuai, profondeurQuai, longueursQuai, longueurDispo, isFull) VALUES (?, ?, ?, ?, ?, ?, '0')";
    const values = [nom, emplacementQuai, idType, profondeurQuai, longueursQuai, longueursQuai];

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
    const sql = "SELECT idQuai AS id, nomQuai AS nom, idTypeQuai, labelType AS type, emplacementQuai, profondeurQuai, longueurDispo, longueursQuai, isFull FROM quais JOIN types ON quais.idTypeQuai = types.idType";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});

// UPDATE QUAI
const updateQuai = asyncHandler(async (req, res) => {
    const {nom, idTypeQuai, emplacementQuai, profondeurQuai, longueursQuai, id} = req.body;

    const sql = "UPDATE quais SET nomQuai = ?, idTypeQuai = ?, emplacementQuai = ?, profondeurQuai = ?, longueursQuai = ? WHERE idQuai = ?";
    const values = [nom, idTypeQuai, emplacementQuai, profondeurQuai, longueursQuai, id];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Quai modifié"});
    })
});

// DELETE QUAI
const deleteQuai = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM quais WHERE idQuai = ?";
    
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).send({error: err});
        res.status(201).send({message: "Quai supprimé avec succès"})
    })
})

module.exports = {addQuai, getAllQuai, updateQuai, deleteQuai};