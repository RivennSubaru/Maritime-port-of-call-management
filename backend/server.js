const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const db = require('./config/db');

const escaleRoutes = require('./routes/escales.routes');
const userRoutes = require('./routes/users.routes');
const quaiRoutes = require("./routes/quais.routes");
const piloteRoutes = require("./routes/pilotes.routes");
const navireRoutes = require("./routes/navires.routes");
const typesRoutes = require("./routes/types.routes");
const changementRoutes = require("./routes/changements.routes");

dotenv.config();

// API express
const app = express();

// Permission
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/user", userRoutes);
app.use("/escale", escaleRoutes);
app.use("/quai", quaiRoutes);
app.use("/pilote", piloteRoutes);
app.use("/navire", navireRoutes);
app.use("/type", typesRoutes);
app.use("/changement", changementRoutes);


const PORT = process.env.PORT || 8081;

// Lancement de la lecture du serveur
app.listen(8081, () => {
    console.log(`Hacking NASA on the port ${PORT}...`)
})