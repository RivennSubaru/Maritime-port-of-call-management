const asyncHandler = require('express-async-handler');
const db = require('../config/db');

// ADD ESCALE
const addEscale = asyncHandler(async (req, res) => {
    const {idNav, idQuai, numEscale, ETD, ETA, provenance, destination, typeMouvement, etatEscale} = req.body;

    const sql = "INSERT INTO `escales`(`idNav`, `idQuai`, `numEscale`, `ETD`, `ETA`, `provenance`, `destination`, `typeMouvement`, `etatEscale`, `dateCreationEscale`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
    const values = [idNav, idQuai, numEscale, ETD, ETA, provenance, destination, typeMouvement, etatEscale];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Escale ajouté"});
    })
});

// GET ALL ESCALE (with nomQuai & nomNavire)
const getAllEscale = asyncHandler(async (req, res) => {
    const sql = "SELECT `idEscale` AS `id`, `escales`.`idNav`, `nomNav`, `escales`.`idQuai`, `nomQuai`, `numEscale`, `ETD`, `ETA`, `provenance`, `destination`, `ATA`, `ATD`, `typeMouvement`, `etatEscale`, `dateCreationEscale` FROM `escales` JOIN `navires` ON `escales`.`idNav` = `navires`.`idNav` JOIN `quais` ON `escales`.`idQuai` = `quais`.`idQuai`";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
})

// GET ALL CURRENT INCOMING ESCALE
const getCurrEscaleEntrant = asyncHandler(async (req, res) => {
    const sql = "SELECT `idEscale`, `numEscale`, escales.idNav, navires.numNav, navires.nomNav, escales.idQuai, quais.nomQuai, DATE(`ETA`) AS dateArrivEst, TIME(`ETA`) AS heureArrivEst, `provenance`, DATE(`ATD`) AS dateDepartEff, TIME(`ATD`) AS heureDepartEff, `dateCreationEscale` FROM `escales` JOIN navires ON escales.idNav = navires.idNav JOIN quais ON escales.idQuai = quais.idQuai WHERE DATE(`ETA`) = CURRENT_DATE AND etatEscale = \"Actif\" AND typeMouvement = \"Entrant\"";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
})

// GET ALL CURRENT ESCALE SORTANT
const getCurrEscaleSortant = asyncHandler(async (req, res) => {
    const sql = "SELECT `idEscale`, `numEscale`, escales.idNav, navires.numNav, navires.nomNav, escales.idQuai, quais.nomQuai, DATE(`ETD`) AS dateDepartEst, TIME(`ETA`) AS heureDepartEst, `provenance`, `dateCreationEscale` FROM `escales` JOIN navires ON escales.idNav = navires.idNav JOIN quais ON escales.idQuai = quais.idQuai WHERE DATE(`ETD`) = CURRENT_DATE AND etatEscale = \"Prévu\" AND typeMouvement = \"Sortant\"";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
})

// GET ALL ESCALE IN CURRENT MONTH
const getAllMonthEscale = asyncHandler(async (req, res) => {
    const sql = "SELECT * FROM `escales` WHERE MONTH(ETD) = MONTH(CURDATE()) AND YEAR(ETD) = YEAR(CURDATE());";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
})

// GET INCOMING ESCALE IN CURRENT MONTH 
const getMonthEscalePrev = asyncHandler(async (req, res) => {
    const sql = "SELECT * FROM `escales` WHERE MONTH(ETD) = MONTH(CURDATE()) AND YEAR(ETD) = YEAR(CURDATE()) AND etatEscale = \"prévu\";";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});

//GET FINISHED ESCALE IN CURRENT MONTH 
const getMonthEscaleFin = asyncHandler(async (req, res) => {
    const sql = "SELECT * FROM `escales` WHERE MONTH(ETD) = MONTH(CURDATE()) AND YEAR(ETD) = YEAR(CURDATE()) AND etatEscale = \"Terminé\";";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});

// GET SUM OF ALL, PREV, ACTIF, FIN ESCALE IN CURRENT MONTH
const getCountEscales = asyncHandler(async (req, res) => {
    const sql = "SELECT COUNT(*) AS total, SUM(etatEscale = 'Prévu') AS nombrePrevu, SUM(etatEscale = 'Actif') AS nombreActif, SUM(etatEscale = 'Terminé') AS nombreTermine FROM escales WHERE MONTH(ETD) = MONTH(CURDATE()) AND YEAR(ETD) = YEAR(CURDATE());";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});


// GET NUMB OF ESCALE ENTRANT /DAY /MONTH
const getFinEscalesPerDay = asyncHandler(async (req, res) => {
    const sql = "SELECT MONTH(ATA) AS mois, DAY(ATA) AS jours, COUNT(*) AS `count` FROM escales WHERE ATA IS NOT NULL AND etatEscale = \"Terminé\" AND typeMouvement = \"Entrant\" AND YEAR(ATA) = YEAR(CURDATE()) GROUP BY mois, jours ORDER BY mois, jours;";

    db.query(sql, (err, data) => {
        if (err) res.status(500).send({error: err.message});
        res.status(201).send(data);
    })
});



// UPDATE ESCALE
const updateEscale = asyncHandler(async (req, res) => {
    const {idNav, idQuai, numEscale, ETD, ETA, provenance, destination, typeMouvement, etatEscale, id} = req.body;

    const sql = "UPDATE escales SET idNav = ?, idQuai = ?, numEscale = ?, ETD = ?, ETA = ?, provenance = ?, destination = ?, typeMouvement = ?, etatEscale = ? WHERE idEscale = ?";
    const values = [idNav, idQuai, numEscale, ETD, ETA, provenance, destination, typeMouvement, etatEscale, id];

    db.query(sql, values, (err, data) => {
        if (err) {
            res.status(500).send({error: err});
            return;
        }
        res.status(201).send({message: "Escale modifiée"});
    })
});

module.exports = {  
    addEscale, 
    getAllEscale, 
    getCurrEscaleEntrant, 
    getCurrEscaleSortant, 
    getAllMonthEscale, 
    getMonthEscalePrev, 
    getMonthEscaleFin, 
    getCountEscales,
    getFinEscalesPerDay,
    updateEscale
}