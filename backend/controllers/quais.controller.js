const asyncHandler = require('express-async-handler');
const db = require('../config/db');

// ADD QUAI
const addQuai = asyncHandler(async (req, res) => {
    const {nomQuai, emplacementQuai, profondeurQuai, longueursQuai} = req.body;

    const sql = "INSERT INTO `quais` (nomQuai, emplacementQuai, profondeurQuai, longueursQuai) VALUES (?, ?, ?, ?, ?)";
    const values = [nomQuai, emplacementQuai, profondeurQuai, longueursQuai, longueursQuai];

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
    const sql = "SELECT idQuai AS id, nomQuai AS nom, emplacementQuai, profondeurQuai, longueursQuai FROM quais";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});

// GET ALL QUAI WITH ALL OCCUPATION
const getAllQuaiOccupation = asyncHandler(async (req, res) => {
    const sql = "SELECT q.idQuai, q.nomQuai, q.emplacementQuai, q.profondeurQuai, q.longueursQuai, JSON_ARRAYAGG( JSON_OBJECT( 'idNav', n.idNav, 'nomNav', n.nomNav, 'typeChange', c.typeChange, 'dateChange', c.dateChange, 'longueursNav', n.longueursNav ) ) AS occupation FROM quais q LEFT JOIN changements c ON q.idQuai = c.idQuai LEFT JOIN navires n ON c.idNav = n.idNav GROUP BY q.idQuai, q.nomQuai ORDER BY `occupation` ASC;";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});

// UPDATE QUAI
const updateQuai = asyncHandler(async (req, res) => {
    const {nomQuai, emplacementQuai, profondeurQuai, longueursQuai, id} = req.body;

    const sql = "UPDATE quais SET nomQuai = ?, emplacementQuai = ?, profondeurQuai = ?, longueursQuai = ? WHERE idQuai = ?";
    const values = [nom, emplacementQuai, profondeurQuai, longueursQuai, id];

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

module.exports = {addQuai, getAllQuai, updateQuai, getAllQuaiOccupation, deleteQuai};