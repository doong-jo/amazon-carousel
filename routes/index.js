const router = require("express").Router();

const carouselRouter = require("./carousel");

const routes = {
    "/carousel": carouselRouter
};

for (const [path, route] of Object.entries(routes)) {
    router.use(path, route);
}

module.exports = router;
