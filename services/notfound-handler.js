const createError = require("http-errors");

module.exports = (req, res, next) => {
    console.error("wrong path:", req.path);
    next(createError(404));
};
