// Importo MYSQL
const mysql = require("mysql2");

// Dati per la connessione
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    // Blocco in caso di errore
    if (err) throw err;

    // Codice in caso di connessione riuscita
    console.log("Connected to MySQL!");
});

// Esporto la connessione
module.exports = connection;
