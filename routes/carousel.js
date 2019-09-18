const express = require("express");

const router = express.Router();

const amazonCardData = require("../public/json/amazon-card-data.json");
const amazonCarouselData = require("../public/json/amazon-carousel-data.json");
const miniCarouselData = require("../public/json/carousel-data.json");

function getAmazonCardData(req, res) {
    res.json(amazonCardData);
}

function getAmazonCarouselData(req, res) {
    res.json(amazonCarouselData);
}

function getMiniCarouselData(req, res) {
    res.json(miniCarouselData);
}

router.get("/amazon-card", getAmazonCardData);
router.get("/amazon-carousel", getAmazonCarouselData);
router.get("/mini-carousel", getMiniCarouselData);

module.exports = router;
