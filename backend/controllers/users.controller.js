const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const db = require('../config/db');

// INSCRIPTION
const registerUser = asyncHandler(async (req, res) => {
    const {pseudo, emailUser, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO utilisateurs (pseudo, emailUser, password) VALUES (?, ?, ?)';
    const values = [pseudo, emailUser, hashedPassword];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err.message});
            return;
        }
        res.status(201).send({message: 'Utilisateur inscrit avec succes'});
    })
})

// LOGIN
const loginUser = asyncHandler(async (req, res) => {
    const {emailUser, password} = req.body;

    const sql = 'SELECT * FROM utilisateurs WHERE emailUser = ?';

    db.query(sql, [emailUser], async (err, data) => {
        if (err) {
            res.status(500).send({error: err.message});
            return;
        }
        if (data.length === 0 || !(await bcrypt.compare(password, data[0].password))) {
            res.status(401).send({message: 'Email ou mot de passe invalide'});
            return;
        }
        res.status(200).send({message: "Connecté"})
    });
})

module.exports = {registerUser, loginUser};