import "./styles/normarlize.css";
import "./styles/index.scss";
import "./styles/card.scss";
import "./styles/carousel.scss";

import { getOriginUrl } from "./util/light-dom.js";
import _ from "./util/constants.js";
import { requestServer } from "./util/light-api.js";
import Card from "./components/card.js";
import Carousel from "./components/carousel.js";

async function fetchData(dataUrl) {
    let resultData;

    try {
        resultData = await requestServer(
            _.METHOD_GET,
            {},
            `${getOriginUrl()}${dataUrl}`,
            _.HEADER_TYPE_JSON
        );
    } catch (e) {
        console.error(e.message);
        return;
    }

    return resultData;
}

(async function render() {
    const miniCarouselData = await fetchData(_.URL.MINI_CAROUSEL);
    const mainCarouselData = await fetchData(_.URL.MAIN_CAROUSEL);
    const cardData = await fetchData(_.URL.CARD);

    const card = new Card()
        .init("#card", {
            minLength: 2,
            maxLength: 5,
            animSpriteIndexArr: [0]
        })
        .build(cardData)
        .render();

    const cardCarousel = new Carousel()
        .init("#full-carousel", {
            slideSpeed: 1000,
            type: "full"
        })
        .build(mainCarouselData)
        .render();

    card.setChangeCircleHandler(cardCarousel.moveToSlide.bind(cardCarousel));
    cardCarousel.setChangeSlideHandler(card.followByCircleIndex.bind(card));

    const miniCarousel = new Carousel()
        .init("#mini-carousel", {
            type: "mini",
            slideSpeed: 300,
            autoPlaySpeed: 3000,
            stopAutoPlayWhenPageHidden: true,
            autoPlay: true
        })
        .build(miniCarouselData)
        .render();
})();
