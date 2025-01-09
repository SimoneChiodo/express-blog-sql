const express = require("express");
const router = express.Router();

// Importo la connessione al database SQL
const connection = require("../db/conn");

// Importo i post
const posts = require("../data/posts");

// METODI CRUD
// Metodo: Index (Visualizzare tutti gli elementi)
function index(req, res) {
    // Creo la query SQL
    const sql = "SELECT * FROM `posts`";

    // Effettuo la query
    connection.query(sql, (err, results) => {
        // Restituisco il risultato
        res.type("json").send(results);
    });
}

// Metodo: Show (Visualizzare un elemento)
function show(req, res) {
    const id = parseInt(req.params.id);
    // if (checkID(res, posts, id) === false) return;

    // Creo la query SQL
    const sqlPost = "SELECT * FROM `posts` WHERE `posts`.`id` = ?";
    const sqlTags = `SELECT t.label
    FROM posts AS p
    JOIN post_tag AS p_t
    ON p.id = p_t.post_id
    JOIN tags AS t
    ON p_t.tag_id = t.id
    WHERE p.id = 1;`;

    // Effettuo la query
    connection.query(sqlPost, [id], (err, results) => {
        // Controllo se ci sono errori
        if (err) {
            console.log(err);

            return res
                .status(500)
                .type("json")
                .send({ error: "Failed to show post" });
        }

        // Controllo se ho trovato il post
        if (results.length === 0) {
            return res
                .status(500)
                .type("json")
                .send({ error: "Post not found" });
        }

        // Salvo temporaneamente il post
        let post = results[0];

        //Effettuo la query per ottenere i tags
        connection.query(sqlTags, [id], (err, tagsResults) => {
            // Controllo se ci sono errori
            if (err) {
                console.log(err);

                return res
                    .status(500)
                    .type("json")
                    .send({ error: "Failed to show post" });
            }

            //Aggiungo i tag del post
            post.tags = tagsResults;

            // Restituisco il risultato
            res.type("json").send(results);
        });
    });
}

// Metodo: Store (Creare un nuovo elemento)
function store(req, res) {
    // Prelevo i dati
    let { title, author, status, image, description, genre, tags, publish } =
        req.body;

    if (
        !title ||
        !author ||
        !status ||
        !image ||
        !description ||
        !genre ||
        !Array.isArray(tags) ||
        publish === undefined
    ) {
        res.status(400).json({
            error: "Parameters not OK",
        });

        return;
    }

    //Trovo l'id da assegnare
    let id = 0;
    posts.map((post) => {
        if (post.id > id) id = post.id;
    });

    const newPost = {
        id: id + 1,
        title,
        author,
        status,
        image,
        description,
        genre,
        tags,
        publish,
    };

    posts.push(newPost);

    // res.type("json").send(posts);
    res.status(200).send();
}

// Metodo: Update (Modificare interamente un elemento)
function update(req, res) {
    const id = parseInt(req.params.id);
    if (checkID(res, posts, id) === false) return;

    // Prelevo i dati
    let { title, author, status, image, description, genre, tags, publish } =
        req.body;

    // Controllo se tutti i dati sono stati passati correttamente
    if (
        !title ||
        !author ||
        !status ||
        !image ||
        !description ||
        !genre ||
        !Array.isArray(tags) ||
        publish === undefined
    ) {
        res.status(400).json({
            error: "Parameters are not correct",
        });

        return;
    }

    // Prelevo il post da modificare
    let post = posts.find((post) => post.id === id);

    // Modifico il post
    post.title = title;
    post.author = author;
    post.status = status;
    post.image = image;
    post.description = description;
    post.genre = genre;
    post.tags = tags;
    post.publish = publish;

    // res.type("json").send(posts);
    res.status("200").send();
}

// Metodo: Modify (Modificare parzialmente un elemento)
function modify(req, res) {
    const id = parseInt(req.params.id);
    if (checkID(res, posts, id) === false) return;

    // Prelevo i dati
    let { title, author, status, image, description, genre, tags, publish } =
        req.body;

    // Prelevo il post da modificare
    let post = posts.find((post) => post.id === id);

    // Modifico il post, solo con i valori passati
    if (title) post.title = title;
    if (author) post.author = author;
    if (status) post.status = status;
    if (image) post.image = image;
    if (description) post.description = description;
    if (genre) post.genre = genre;
    if (tags) post.tags = tags;
    if (publish) post.publish = publish;

    res.type("json").send(posts);
}

// Metodo: Destroy (Eliminare un elemento)
function destroy(req, res) {
    const id = parseInt(req.params.id);
    // if (checkID(res, posts, id) === false) return;

    // Creo la query SQL
    const sql = "DELETE FROM `posts` WHERE id = ?";

    // Effettuo la query
    connection.query(sql, [id], (err, results) => {
        // Controllo se ci sono errori
        if (err) {
            console.log(err);

            return res
                .status(500)
                .type("json")
                .send({ error: "Failed to delete post" });
        }

        res.status(204).send();
    });
}

//Funzione per controllare gli ID (restituisce un messaggio di errore diverso per ogni casistica)
function checkID(res, array, id) {
    // Se l'id non è un numero
    if (isNaN(id)) {
        res.status(400).json({
            error: "The parameter ID must be a number",
        });

        return false;
    }

    // Se l'id è minore di 0
    if (id <= 0) {
        res.status(400).json({
            error: "The parameter ID must be higher than 0",
        });

        return false;
    }

    // Prelevo l'ID più grande
    let maxId = 0;
    array.map((post) => {
        if (post.id > maxId) maxId = post.id;
    });

    // Se l'id è maggiore del massimo
    if (id > maxId) {
        res.status(400).json({
            error:
                "The parameter ID is not assigned to any element of array (the higher ID is: " +
                maxId +
                ")",
        });

        return false;
    }

    // Controllo se l'elemento è contenuto nell'array
    let endFz = false;
    array.map((post) => {
        if (post.id === id) {
            //Termino il .map, ma non la funzione
            endFz = true;
            return;
        }
    });
    if (endFz) return true;

    // Casistica rimanente: ci sono buchi nell'array
    res.status(400).json({
        error: "This ID does not exist",
    });
    return false;
}

//Esporto i metodi
module.exports = { index, show, store, update, modify, destroy };
