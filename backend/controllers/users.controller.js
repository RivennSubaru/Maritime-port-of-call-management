const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const db = require('../config/db');
require('dotenv').config();

// INSCRIPTION
const registerUser = asyncHandler(async (req, res) => {
    const {pseudo, emailUser, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO utilisateurs (pseudo, emailUser, password, role) VALUES (?, ?, ?, "user")';
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
        
        const user = data[0];

        //Génération du token JWT
        const token = jwt.sign(
            { id: user.id, email: user.emailUser, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Durée de validité du token
        );

        res.status(200).send({
            id: user.id,
            email: user.emailUser,
            pseudo: user.pseudo,
            role: user.role,
            token: token
        });
    });
})

module.exports = {registerUser, loginUser};