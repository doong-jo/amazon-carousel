const express = require("express");
const path = require("path");
const logger = require("morgan");
const redis = require("redis");
const session = require("express-session");

const RedisStore = require("connect-redis")(session);
const client = redis.createClient();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();

const notFoundHandler = require("./services/handler/notfound-handler");
const serverInternalHandler = require("./services/handler/serverinternal-handler");
const mainRouter = require("./routes/index");

const _ = require("./services/constants");

const PORT = 80;
const STATIC_PATH = express.static(path.join(__dirname, "public"));
const HTML_FILE = path.join(__dirname, "public/index.html");

app.use(passport.initialize());
// app.use(passport.session());

app.use(
    session({
        store: new RedisStore({ client }),
        secret: process.env.REDIS_SECRET,
        resave: false,
        ttl: _.SESSION_AGE,
        saveUninitialized: true,
        cookie: { maxAge: _.COOKIE_AGE }
    })
);

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
