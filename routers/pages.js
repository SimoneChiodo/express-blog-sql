const express = require("express");
const router = express.Router();

// Importo i post
const posts = require("../data/posts");

// Pagina: Home
router.get("/", (req, res) => {
    res.type("html").send("Server del mio blog");
});

// Pagina: Bacheca
router.get("/bacheca", (req, res) => {
    res.type("json").send({
        totalePost: posts.length,
        listaPost: posts,
    });
});

//Esporto i metodi
module.exports = router;
