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
});

// GET ALL NAVIRES
const getAllNavires = asyncHandler(async (req, res) => {
    const sql = "SELECT idNav, navigateurs.idNavigateur, nomNavigateur,"
            + " idTypeNav, labelType AS type, numNav AS num, nomNav AS nom,"
            + "tirantEau, longueursNav FROM navires JOIN navigateurs ON navires.idNavigateur = navigateurs.idNavigateur"
            + "JOIN types ON navires.idTypeNav = types.idType";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});

module.exports = {addNavire, addNavireSousRequete, getAllNavires};