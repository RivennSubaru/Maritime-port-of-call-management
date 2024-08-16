const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const addChange = asyncHandler(async (req, res) => {
    const {idNav, idQuai, typeChange} = req.body;

    const sql = "INSERT INTO `changements`(`idNav`, `idQuai`, `typeChange`, `dateChange`) VALUES (?, ?, ?, NOW())";
    const values = [idNav, idQuai, typeChange];

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

    const sql = "DELETE FROM `escales` WHERE idNav = ? AND idQuai = ?";

    db.query(sql, [idNav, idQuai], (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Changement effacé"});
    })
});

module.exports = {addChange, removeChange}