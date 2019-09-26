const userAPI = require("../../api/user");

async function getUsers(req, res) {
    const response = await userAPI.findAllUser(req.query);
    if (!response) {
        res.sendStatus(403);
        return;
    }

    res.json(response);
}

async function signup(req, res) {
    if (res.exists) {
        res.sendStatus(403);
        return;
    }

    const response = await userAPI.signup(req.body);
    if (!response) {
        res.sendStatus(403);
    }

    res.json(response);
}

async function checkExists(req, res, next) {
    const getId = {
        GET: req.query,
        POST: req.body
    };
    const { id } = getId[req.method];
    const exists = Boolean(await userAPI.findUserById({ id }));

    if (typeof exists === "undefined") {
        res.sendStatus(403);
        return;
    }

    if (req.route.path === "/exists") {
        res.json(exists);
        return;
    }
    res.exists = exists;
    next();
}

module.exports = {
    getUsers,
    signup,
    checkExists
};
