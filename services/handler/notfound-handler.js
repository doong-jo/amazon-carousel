const path = require("path");

module.exports = (req, res) => {
    console.error("wrong path:", req.path);
    res.sendFile(path.join(__dirname, "notfound.html"));
};
