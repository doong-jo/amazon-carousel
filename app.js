const express = require("express");
const path = require("path");
const logger = require("morgan");

const app = express();

const notFoundHandler = require("./services/notfound-handler");
const serverInternalHandler = require("./services/serverinternal-handler");
const mainRouter = require("./routes/index");

const PORT = 8090;
const STATIC_PATH = express.static(path.join(__dirname, "public"));
const HTML_FILE = path.join(__dirname, "public/index.html");

app.use(logger("dev"));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(STATIC_PATH);
app.get("/", (req, res) => {
    res.sendFile(HTML_FILE);
});
app.use("/", mainRouter);

app.use(notFoundHandler);
app.use(serverInternalHandler);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening ${PORT}...`);
});

module.exports = app;
