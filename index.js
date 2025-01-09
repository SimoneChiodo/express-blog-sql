const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const URL = process.env.HOST_DOMAIN;
const PORT = process.env.HOST_PORT;

// Middlewares
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// Importo i router
const postsRouter = require("./routers/posts");
const pagesRouter = require("./routers/pages");

// Imposto l'uso delle rotte contenute nei router
app.use("/", pagesRouter);
app.use("/posts", postsRouter);

// Error Handler
app.use(errorsHandler);
app.use(notFound);

// Avvio
app.listen(PORT, () => {
    console.log(`Server listening at ${URL}:${PORT}`);
});
