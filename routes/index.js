const router = require("express").Router();

const carouselRouter = require("./carousel");
const adminRouter = require("./admin");

const routes = {
    "/carousel": carouselRouter,
    "/admin": adminRouter
};

for (const [path, route] of Object.entries(routes)) {
    router.use(path, route);
}

module.exports = router;
