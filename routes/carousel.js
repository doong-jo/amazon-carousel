const express = require("express");
const carouselService = require("../services/carousel-service");

const router = express.Router();

router.get("/amazon-card", carouselService.getAmazonCardData);
router.get("/amazon-carousel", carouselService.getAmazonCarouselData);
router.get("/mini-carousel", carouselService.getMiniCarouselData);

module.exports = router;
