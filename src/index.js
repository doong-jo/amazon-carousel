import "./styles/normarlize.css";
import "./styles/index.scss";

import { getOriginUrl } from "./util/light-dom.js";
import { requestServer, watchPageVisibility } from "./util/light-api.js";
import MainCarousel from "./modules/main-carousel.js";
// import MiniCarousel from "./modules/mini-carousel.js";

(async function makeMainCarousel() {
    let mainCarouselData;
    try {
        mainCarouselData = await requestServer(
            "GET",
            {},
            `${getOriginUrl()}/carousel/main-items`,
            { "Content-Type": "application/json" }
        );
    } catch (e) {
        console.error(e.message);
        return;
    }

    const mainCarousel = new MainCarousel(
        "#amazon-main-carousel",
        mainCarouselData
    );
})();
