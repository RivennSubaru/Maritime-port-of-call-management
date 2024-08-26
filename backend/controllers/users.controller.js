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
});


// GET ALL (WITHOUT PASS)
const getAllUser = asyncHandler(async (req, res) => {
    const sql = "SELECT `idUser` AS id, `pseudo`, `emailUser`, `role` FROM `utilisateurs`";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});

// DELETE USER 
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM utilisateurs WHERE idUser = ?";
    
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).send({error: err});
        res.status(201).send({message: "utilisateur supprimé avec succès"})
    })
});

module.exports = {getAllUser, registerUser, loginUser, deleteUser};