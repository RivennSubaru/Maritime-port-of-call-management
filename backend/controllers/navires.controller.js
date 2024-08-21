const asyncHandler = require('express-async-handler');
const db = require('../config/db');

// ADD NAVIRE 
const addNavire = asyncHandler(async (req, res) => {
    const {nomNav, numNav, typeNav, tirantEau, longueur, idPilote} = req.body;

    const sql = "INSERT INTO navires(nomNav, numNav, typeNav, tirantEau, longueursNav, idPilote, situationNav) VALUES(?, ?, ?, ?, ?, ?, \"parti\")";
    const values = [nomNav, numNav, typeNav, tirantEau, longueur, idPilote];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Navire ajouté"});
    })
})

// ADD NAVIRE WITH TEL PILOTE
const addNavireSousRequete = asyncHandler(async (req, res) => {
    const {nomNav, numNav, typeNav, tirantEau, longueur, telPilote} = req.body;

    const sql = "INSERT INTO navires(nomNav, numNav, typeNav, tirantEau, longueursNav, situationNav, idPilote)"
            + "VALUES(?, ?, ?, ?, ?, \"parti\", (SELECT idPilote FROM pilotes WHERE telPilote = ?))";

    const values = [nomNav, numNav, typeNav, tirantEau, longueur, telPilote];

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
    const sql = "SELECT idNav AS id, pilotes.idPilote, nomPilote, typeNav AS type, numNav, nomNav, tirantEau, longueursNav AS longueur, situationNav FROM navires JOIN pilotes ON navires.idPilote = pilotes.idPilote";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});
// GET ALL NAVIRES PARTI
const getAllNaviresParti = asyncHandler(async (req, res) => {
    const sql = "SELECT idNav AS id, pilotes.idPilote, nomPilote, typeNav AS type, numNav, nomNav, tirantEau, longueursNav AS longueur, situationNav FROM navires JOIN pilotes ON navires.idPilote = pilotes.idPilote WHERE navires.situationNav = \"parti\"";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});
// GET ALL NAVIRES TO ESCALE (Amarée ou Parti)
const getAllNaviresToEscale = asyncHandler(async (req, res) => {
    const sql = "SELECT idNav AS id, pilotes.idPilote, nomPilote, typeNav AS type, numNav, nomNav, tirantEau, longueursNav AS longueur, situationNav FROM navires JOIN pilotes ON navires.idPilote = pilotes.idPilote WHERE navires.situationNav = \"parti\" OR navires.situationNav = \"Amarré\"";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});
// GET ALL FREE NAVIRES
const getAllNaviresLibre = asyncHandler(async (req, res) => {
    const sql = "SELECT idNav AS id, pilotes.idPilote, nomPilote, typeNav AS type, numNav, nomNav, tirantEau, longueursNav AS longueur, situationNav FROM navires JOIN pilotes ON navires.idPilote = pilotes.idPilote WHERE navires.situationNav = \"En mouvement\" OR navires.situationNav = \"Parti\"";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});


// UPDATE NAVIRE
const updateNavire = asyncHandler(async (req, res) => {
    const {nomNav, numNav, typeNav, tirantEau, longueur, idPilote, id} = req.body;

    const sql = "UPDATE navires SET nomNav = ?, numNav = ?, typeNav = ?, tirantEau = ?, longueursNav = ?, idPilote = ? WHERE idNav = ?";
    const values = [nomNav, numNav, typeNav, tirantEau, longueur, idPilote, id];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Quai modifié"});
    })
});

// CHANGEMENT SITUATION
const changeSituation = asyncHandler(async (req, res) => {
    const {idNav, situationNav} = req.body;

    const sql = "UPDATE navires SET situationNav = ? WHERE idNav = ?";

    db.query(sql, [situationNav, idNav], (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "navire modifié"});
    })
});

// DELETE NAVIRE
const deleteNavire = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM navires WHERE idNav = ?";
    
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).send({error: err});
        res.status(201).send({message: "Navire supprimé avec succès"})
    })
})

module.exports = {addNavire, addNavireSousRequete, getAllNavires, getAllNaviresLibre, getAllNaviresToEscale, updateNavire, changeSituation, deleteNavire, getAllNaviresParti};