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

module.exports = {addChange}