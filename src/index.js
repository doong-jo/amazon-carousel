import "./styles/normarlize.css";
import "./styles/index.scss";
import "./styles/amazon-card.scss";

import { getOriginUrl } from "./util/light-dom.js";
import _ from "./util/constants.js";
import { requestServer, watchPageVisibility } from "./util/light-api.js";
import AmazonCard from "./components/amazon-card.js";
import Carousel from "./components/carousel.js";

(async function makeAmazonCard() {
    let amazonCardData;
    try {
        amazonCardData = await requestServer(
            "GET",
            {},
            `${getOriginUrl()}/carousel/amazon-card`,
            { "Content-Type": "application/json" }
        );
    } catch (e) {
        console.error(e.message);
        return;
    }

    let amazonCarouselData;
    try {
        amazonCarouselData = await requestServer(
            "GET",
            {},
            `${getOriginUrl()}/carousel/amazon-carousel`,
            { "Content-Type": "application/json" }
        );
    } catch (e) {
        console.error(e.message);
        return;
    }

    const amazonCardCarousel = new Carousel(
        "#amazon-card-carousel",
        amazonCarouselData,
        {}
    );
    const amazonCard = new AmazonCard("#amazon-card", amazonCardData);

    amazonCard.subscribe(
        _.EVENT_MOVE_TO_CAROUSEL,
        amazonCardCarousel.moveToSlide,
        amazonCardCarousel
    );
})();
