const express = require("express");

const router = express.Router();

const mainCarouselItems = require("../public/json/main-carousel-items.json");
const miniCarouselItems = require("../public/json/mini-carousel-items.json");

function getMainCarorselData(req, res) {
    res.json(mainCarouselItems);
}

function getMiniCarorselData(req, res) {
    res.json(miniCarouselItems);
}

router.get("/main-items", getMainCarorselData);
router.get("/mini-items", getMiniCarorselData);

module.exports = router;
