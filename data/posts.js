// Temporaneo percorso LOCALHOST
require("dotenv").config();
const URL = process.env.HOST_DOMAIN;
const PORT = process.env.HOST_PORT;
const localhost = URL + ":" + PORT;

// Dichiarazione dei post
let posts = [
    // Post 1
    {
        id: 1,
        title: "Ciambellone",
        author: "Giallos Zafferanos",
        status: "Bozza",
        image: localhost + "/images/ciambellone.jpeg",
        description: "Descrizione",
        genre: "Genere 1",
        tags: ["ciambella", "zucchero a velo", "dolce"],
        publish: false,
    },
    // Post 2
    {
        id: 2,
        title: "Cracker di barbabietola",
        author: "Giallos Zafferanos",
        status: "Bozza",
        image: localhost + "/images/cracker_barbabietola.jpeg",
        description: "Descrizione",
        genre: "Genere 2",
        tags: ["cracker", "barbabietola"],
        publish: false,
    },
    // Post 3
    {
        id: 3,
        title: "Pane fritto dolce",
        author: "Giallos Zafferanos",
        status: "Bozza",
        image: localhost + "/images/pane_fritto_dolce.jpeg",
        description: "Descrizione",
        genre: "Genere 3",
        tags: ["pane", "fritto", "dolce"],
        publish: false,
    },
    // Post 4
    {
        id: 4,
        title: "Pasta di barbabietola",
        author: "Giallos Zafferanos",
        status: "Bozza",
        image: localhost + "/images/pasta_barbabietola.jpeg",
        description: "Descrizione",
        genre: "Genere 1",
        tags: ["pasta", "barbabietola"],
        publish: false,
    },
    // Post 5
    {
        id: 5,
        title: "Torta paesana",
        author: "Giallos Zafferanos",
        status: "Bozza",
        image: localhost + "/images/torta_paesana.jpeg",
        description: "Descrizione",
        genre: "Genere 2",
        tags: ["torta", "dolce"],
        publish: false,
    },
];

//Esporto i posts
module.exports = posts;
