const express = require("express");

const router = express.Router();

function getMainCarorselData(req, res) {
    res.json("main carousel data");
}

function getMiniCarorselData(req, res) {
    res.json("mini carousel data");
}

router.get("/main-items", getMainCarorselData);
router.get("/mini-items", getMiniCarorselData);

module.exports = router;
