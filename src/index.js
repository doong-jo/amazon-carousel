import "./styles/normarlize.css";
import "./styles/index.scss";
import "./styles/amazon-card.scss";
import "./styles/carousel.scss";

import { getOriginUrl } from "./util/light-dom.js";
import _ from "./util/constants.js";
import { requestServer, watchPageVisibility } from "./util/light-api.js";
import AmazonCard from "./components/amazon-card.js";
import Carousel from "./components/carousel.js";

async function fetchData() {
    let miniCarouselData;
    try {
        miniCarouselData = await requestServer(
            _.METHOD_GET,
            {},
            `${getOriginUrl()}${_.URL.MINI_CAROUSEL}`,
            _.HEADER_TYPE_JSON
        );
    } catch (e) {
        console.error(e.message);
        return;
    }

    let amazonCarouselData;
    try {
        amazonCarouselData = await requestServer(
            _.METHOD_GET,
            {},
            `${getOriginUrl()}${_.URL.AMAZNON_CAROUSEL}`,
            _.HEADER_TYPE_JSON
        );
    } catch (e) {
        console.error(e.message);
        return;
    }

    let amazonCardData;
    try {
        amazonCardData = await requestServer(
            _.METHOD_GET,
            {},
            `${getOriginUrl()}${_.URL.CARD}`,
            _.HEADER_TYPE_JSON
        );
    } catch (e) {
        console.error(e.message);
        return;
    }

    return { miniCarouselData, amazonCarouselData, amazonCardData };
}

(async function makeAmazonCard() {
    const {
        miniCarouselData,
        amazonCarouselData,
        amazonCardData
    } = await fetchData();

    const miniCarousel = new Carousel("#mini-carousel", miniCarouselData, {
        type: "mini",
        slideSpeed: 300,
        autoPlaySpeed: 3000,
        stopWhenPageHidden: true
    });
    const amazonCard = new AmazonCard("#amazon-card", amazonCardData);
    const amazonCardCarousel = new Carousel(
        "#amazon-card-carousel",
        amazonCarouselData,
        {
            slideSpeed: 500,
            type: "full"
        }
    );

    amazonCard.subscribe(
        _.EVENT_MOVE_TO_CAROUSEL,
        amazonCardCarousel.moveToSlide,
        amazonCardCarousel
    );
})();
