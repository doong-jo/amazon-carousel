import {
    $$,
    on,
    containClass,
    findChildren,
    setHTML,
    addClass,
    removeClass
} from "../util/light-dom.js";

class MainCarousel {
    constructor(container, items, options = {}) {
        this.__ITEM_MAX_LENGTH = 5;
        this.__ITEM_MIN_LENGTH = 2;

        if (!Array.isArray(items) || items.length < this.__ITEM_MIN_LENGTH) {
            throw new Error("MainCarousel need array of items");
        }

        this.__CLASS_CAROUSEL_CONTAINER = "main-carousel";
        this.__CLASS_CAROUSEL_CARD = `${this.__CLASS_CAROUSEL_CONTAINER}-card`;
        this.__CLASS_CAROUSEL_IMG = `${this.__CLASS_CAROUSEL_CARD}-img`;
        this.__CLASS_CAROUSEL_TITLE = `${this.__CLASS_CAROUSEL_CARD}-title`;
        this.__CLASS_CAROUSEL_CIRCLE_CONTAINER = `${this.__CLASS_CAROUSEL_CARD}-circle-container`;
        this.__CLASS_CAROUSEL_CIRCLE = `${this.__CLASS_CAROUSEL_CARD}-circle`;
        this.__CLASS_SCALE_UP = `${this.__CLASS_CAROUSEL_CONTAINER}-scale-up`;
        this.__CLASS_SHADOW = `${this.__CLASS_CAROUSEL_CONTAINER}-shadow`;

        this.__options = {
            prevButton: true,
            nextButton: true,
            slideSpeed: 300,
            lazyload: false,
            mouseDrag: false,
            arrowKeys: false
        };
        this.__items =
            items.length > 5 ? items.slice(0, this.__ITEM_MAX_LENGTH) : items;
        this.__container = $$(container);
        this.__focusIndex = 0;

        this.applyOptions(options);
        this.makeElements();
        this.makeCards();
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

    setListeners() {
        on(
            this.__container,
            "click",
            function(e) {
                if (containClass(e.target, this.__CLASS_CAROUSEL_CARD)) {
                    const index = [...e.target.parentElement.children].indexOf(
                        e.target
                    );

                    this.applyFocusStyle(this.__CLASS_SCALE_UP, index);
                    this.applyFocusStyle(this.__CLASS_SHADOW, index);
                }
            }.bind(this)
        );
    }

    makeElements() {
        let cardElements = "";
        for (const item of this.__items) {
            cardElements += /* html */ `<div class="${this.__CLASS_CAROUSEL_CARD}">`;
            const img = /* html */ `<img class="${this.__CLASS_CAROUSEL_IMG}" src="${item.image}" />`;
            const name = /* html */ `<div class="${this.__CLASS_CAROUSEL_TITLE}">${item.name}</div>`;
            let cricleContainer = /* html */ `<div class="${this.__CLASS_CAROUSEL_CIRCLE_CONTAINER}">`;

            for (const i in item.children) {
                const circle = /* html */ `<div class="${this.__CLASS_CAROUSEL_CIRCLE}"></div>`;
                cricleContainer += /* html */ `${circle}`;
            }
            cricleContainer += /* html */ `</div>`;
            cardElements += /* html */ `${img}${name}${cricleContainer}</div>`;
        }

        setHTML(
            this.__container,
            /* html */ `<div class="${this.__CLASS_CAROUSEL_CONTAINER}">${cardElements}</div>`
        );
    }

    makeCards() {
        this.__cardContainers = findChildren(
            this.__container,
            this.__CLASS_CAROUSEL_CARD
        );
        this.__cardImgs = findChildren(
            this.__container,
            this.__CLASS_CAROUSEL_IMG
        );

        this.__cardData = [];
        for (const item of this.__items) {
            this.__cardData.push(item);
        }
    }

    applyFocusStyle(index, className) {
        this.removeFocusStyle();

        this.__focusCard = {
            container: this.__cardContainers[index],
            data: this.__cardData[index]
        };
        this.__focusCardImg = this.__cardImgs[index];

        addClass(this.__focusCard.container, className);
        addClass(this.__focusCardImg, className);

        this.__focusIndex = index;
    }

    removeFocusStyle() {
        removeClass(this.__focusCard.container, className);
        removeClass(this.__focusCardImg, className);
    }

    get items() {
        return this.__items;
    }

    get itemMaxLength() {
        return this.__ITEM_MAX_LENGTH;
    }

    get focusCard() {
        return this.__focusCard;
    }

    get focusIndex() {
        return this.__focusIndex;
    }
}

export default MainCarousel;
