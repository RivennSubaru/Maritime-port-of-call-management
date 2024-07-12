const asyncHandler = require('express-async-handler');
const db = require('../config/db');

// ADD NAVIRE 
const addNavire = asyncHandler(async (req, res) => {
    const {nomNav, numNav, idType, tirantEau, longueur, idNavig} = req.body;

    const sql = "INSERT INTO navires(nomNav, numNav, idTypeNav, tirantEau, longueursNav, idNavigateur) VALUES(?, ?, ?, ?, ?, ?)";
    const values = [nomNav, numNav, idType, tirantEau, longueur, idNavig];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Navire ajouté"});
    })
})

// ADD NAVIRE WITH TEL NAVIGATEUR
const addNavireSousRequete = asyncHandler(async (req, res) => {
    const {nomNav, numNav, idType, tirantEau, longueur, telNavigateur} = req.body;

    const sql = "INSERT INTO navires(nomNav, numNav, idTypeNav, tirantEau, longueursNav, idNavigateur)"
                +"VALUES(?, ?, ?, ?, ?, (SELECT idNavigateur FROM navigateurs WHERE telNavigateur = ?))";

    const values = [nomNav, numNav, idType, tirantEau, longueur, telNavigateur];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Navire ajouté"});
    })
})

module.exports = {addNavire, addNavireSousRequete};