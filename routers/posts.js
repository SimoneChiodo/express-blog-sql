const express = require("express");
const router = express.Router();

//Importo i Controller
const postsController = require("../controllers/postsController");

// METODI CRUD
// Metodo: Index (Visualizzare tutti gli elementi)
router.get("/", postsController.index);

// Metodo: Show (Visualizzare un elemento)
router.get("/:id", postsController.show);

// Metodo: Store (Creare un nuovo elemento)
router.post("/", postsController.store);

// Metodo: Update (Modificare interamente un elemento)
router.put("/:id", postsController.update);

// Metodo: Modify (Modificare parzialmente un elemento)
router.patch("/:id", postsController.modify);

// Metodo: Destroy (Eliminare un elemento)
router.delete("/:id", postsController.destroy);

//Esporto i metodi
module.exports = router;
