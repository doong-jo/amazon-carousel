const path = require("path");
const createError = require("http-errors");

module.exports = (req, res) => {
    console.error("not found path:", req.path);
    console.log(createError(404));
    res.sendFile(path.join(__dirname, "notfound.html"));
};
