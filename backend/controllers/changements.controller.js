const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const addChange = asyncHandler(async (req, res) => {
    const {idNav, idQuai, typeChange, dateChange} = req.body;

    const sql = "INSERT INTO `changements`(`idNav`, `idQuai`, `typeChange`, `dateChange`) VALUES (?, ?, ?, ?)";
    const values = [idNav, idQuai, typeChange, dateChange];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Changement ajouté"});
    })
});

const removeChange = asyncHandler(async (req, res) => {
    const {idNav, idQuai} = req.body;

    const sql = "DELETE FROM changements WHERE idNav = ? AND idQuai = ?";

    db.query(sql, [idNav, idQuai], (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Changement effacé"});
    })
});

const deleteChangeNav = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const sql = "DELETE FROM changements WHERE idNav = ?";

    db.query(sql, [id], (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Changement effacé"});
    })
});
const deleteChangeQuai = asyncHandler(async (req, res) => {
    const {id} = req.params;

    const sql = "DELETE FROM changements WHERE idQuai = ?";

    db.query(sql, [id], (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Changement effacé"});
    })
});

module.exports = {addChange, removeChange, deleteChangeNav, deleteChangeQuai}