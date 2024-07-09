const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config();

// Connexion bd mysql
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Connexion à la base de donnée échoué: " + err.stack);
        return;
    }
    console.log("Connecter à la base de donnée");
})

module.exports = db;