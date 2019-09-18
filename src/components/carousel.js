import { $$, setHTML } from "../util/light-dom.js";

class Carousel {
    constructor(containerSelector, data, options) {
        this.__data = data;
        this.__container = $$(containerSelector);

        this.__options = {
            type: "mini",
            prevButton: true,
            nextButton: true,
            slideSpeed: 300,
            lazyload: false,
            mouseDrag: false,
            arrowKeys: false,
            autoPlay: false,
            autoPlaySpeed: 5000,
            stopWhenPageHidden: false
        };

        this.__CLASS_CAROUSEL_CONTAINER = "carousel-container";

        this.applyOptions(options);
        this.makeElements(this.__options.type);
        this.makeElementVariables();
        this.setListeners();
    }

    applyOptions(options) {
        for (const key in options) {
            if (this.__options.hasOwnProperty(key)) {
                const value = options[key];
                this.__options[key] = value ? value : this.__options[key];
            }
        }
    }

    getMiniTemplate() {
        let miniTemplate = "";
        miniTemplate += /* html */ `
        <div class="${this.__CLASS_CAROUSEL_CONTAINER}">`;

        miniTemplate += /* html */ `</div>`;
        return miniTemplate;
    }

    getFullTemplate() {
        let fullTemplate = "";
        fullTemplate += /* html */ `
        <div class="${this.__CLASS_CAROUSEL_CONTAINER}">`;

        fullTemplate += /* html */ `</div>`;
        return fullTemplate;
    }

    makeElements(type) {
        let resultOfCarousel =
            type === "full" ? this.getFullTemplate() : this.getMiniTemplate();
        setHTML(this.__container, resultOfCarousel);
    }

    makeElementVariables() {}

    setListeners() {}

    prevSlide() {}

    nextSlide() {}

    moveToSlide(index) {
        console.log("moveToSlide index: ", index);
    }
}

export default Carousel;
