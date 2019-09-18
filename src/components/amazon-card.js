import {
    $$,
    on,
    containClass,
    findChildren,
    setHTML,
    create,
    setStyle,
    addClass,
    removeClass,
    getIndexOfNodeList
} from "../util/light-dom.js";
import _ from "../util/constants.js";
import Observable from "../util/observable.js";

class AmazonCard extends Observable {
    constructor(containerSelector, data) {
        super();

        this.__ITEM_MAX_LENGTH = 5;
        this.__ITEM_MIN_LENGTH = 2;

        if (!Array.isArray(data) || data.length < this.__ITEM_MIN_LENGTH) {
            throw new Error("AmazonCard need array of items");
        }

        this.__CLASS_AMAZON_CONTAINER = "amazon-card-container";
        this.__CLASS_AMAZON_CARD = `${this.__CLASS_AMAZON_CONTAINER}__item`;
        this.__CLASS_AMAZON_IMG = `${this.__CLASS_AMAZON_CARD}__img`;
        this.__CLASS_AMAZON_TITLE = `${this.__CLASS_AMAZON_CARD}__title`;
        this.__CLASS_AMAZON_CIRCLE_CONTAINER = `${this.__CLASS_AMAZON_CARD}__circle-container`;
        this.__CLASS_AMAZON_CIRCLE = `${this.__CLASS_AMAZON_CIRCLE_CONTAINER}__circle`;
        this.__CLASS_AMAZON_CIRCLE_SELECTED = "circle-selected";
        this.__CLASS_CARD_SCALE_UP = `${this.__CLASS_AMAZON_CARD}-scale-up`;
        this.__CLASS_IMG_SCALE_UP = `${this.__CLASS_AMAZON_IMG}-scale-up`;
        this.__CLASS_SHADOW = `${this.__CLASS_AMAZON_CONTAINER}-shadow`;

        this.__data =
            data.length > 5 ? data.slice(0, this.__ITEM_MAX_LENGTH) : data;
        this.__container = $$(containerSelector);

        this.circleClickHandler = this.circleClickHandler.bind(this);
        this.cardClickHandler = this.cardClickHandler.bind(this);

        this.makeElements();
        this.makeElementVariables();
        this.setListeners();

        this.applyFocus(0);
    }

    setListeners() {
        on(this.__container, "click", this.cardClickHandler);
        on(this.__container, "click", this.circleClickHandler);
    }

    cardClickHandler(e) {
        let targetCard = e.target.parentElement;
        if (!containClass(targetCard, this.__CLASS_AMAZON_CARD)) {
            return;
        }
        const index = getIndexOfNodeList(this.__cardContainers, targetCard);

        this.removeFocusStyle();
        this.applyFocus(index);

        const slideIndex = this.getSelectedSlideIndex(index, 0);
        this.notify(_.EVENT_MOVE_TO_CAROUSEL, slideIndex);
    }

    circleClickHandler(e) {
        let targetCircleContainer = e.target.parentElement;
        const { target } = e;
        if (
            !containClass(
                targetCircleContainer,
                this.__CLASS_AMAZON_CIRCLE_CONTAINER
            )
        ) {
            return;
        }

        const containerIndex = getIndexOfNodeList(
            this.__circleContainers,
            targetCircleContainer
        );
        const circleIndex = getIndexOfNodeList(
            this.__circles[containerIndex],
            target
        );
        const slideIndex = this.getSelectedSlideIndex(
            containerIndex,
            circleIndex
        );

        this.applyCircleFocus(containerIndex, circleIndex);
        this.notify("MOVE_TO_CAROUSEL", slideIndex);
    }

    makeElements() {
        let cardElements = "";
        for (const eachData of this.__data) {
            cardElements += /* html */ `<div class="${this.__CLASS_AMAZON_CARD}">`;
            const img = create("div");
            addClass(img, this.__CLASS_AMAZON_IMG);
            setStyle(img, "background-image", `url(${eachData.image})`);
            const name = /* html */ `<div class="${this.__CLASS_AMAZON_TITLE}">${eachData.name}</div>`;
            let cricleContainer = /* html */ `<div class="${this.__CLASS_AMAZON_CIRCLE_CONTAINER}">`;

            for (let i = 0; i < eachData.items; i += 1) {
                const circle = /* html */ `<div class="${this.__CLASS_AMAZON_CIRCLE}"></div>`;
                cricleContainer += /* html */ `${circle}`;
            }
            cricleContainer += /* html */ `</div>`;
            cardElements += /* html */ `${img.outerHTML}${name}${cricleContainer}</div>`;
        }

        setHTML(
            this.__container,
            /* html */ `<div class="${this.__CLASS_AMAZON_CONTAINER}">${cardElements}</div>`
        );
    }

    makeElementVariables() {
        this.__cardContainers = findChildren(
            this.__container,
            `.${this.__CLASS_AMAZON_CARD}`
        );
        this.__cardImgs = findChildren(
            this.__container,
            `.${this.__CLASS_AMAZON_IMG}`
        );
        this.__circleContainers = findChildren(
            this.__container,
            `.${this.__CLASS_AMAZON_CIRCLE_CONTAINER}`
        );

        this.__circles = [];
        for (const circleContainer of [...this.__circleContainers]) {
            this.__circles.push(
                findChildren(circleContainer, `.${this.__CLASS_AMAZON_CIRCLE}`)
            );
        }
    }

    applyCircleFocus(containerIndex, circleIndex) {
        if (this.__selectedCircle) {
            removeClass(
                this.__selectedCircle,
                this.__CLASS_AMAZON_CIRCLE_SELECTED
            );
        }
        this.__selectedCircle = this.__circles[containerIndex][circleIndex];

        addClass(this.__selectedCircle, this.__CLASS_AMAZON_CIRCLE_SELECTED);
    }

    applyFocus(index) {
        this.applyCircleFocus(index, 0);
        this.applyFocusStyle(index);
    }

    applyFocusStyle(index) {
        this.__focusCard = this.__cardContainers[index];
        this.__focusCardImg = this.__cardImgs[index];

        addClass(this.__focusCard, this.__CLASS_SHADOW);
        addClass(this.__focusCard, this.__CLASS_CARD_SCALE_UP);
        addClass(this.__focusCardImg, this.__CLASS_IMG_SCALE_UP);
    }

    removeFocusStyle() {
        if (this.__focusCard) {
            removeClass(this.__focusCard, this.__CLASS_SHADOW);
            removeClass(this.__focusCard, this.__CLASS_CARD_SCALE_UP);
            removeClass(this.__focusCardImg, this.__CLASS_IMG_SCALE_UP);
        }
    }

    getSelectedSlideIndex(containerIndex, circleIndex) {
        let resultIndex = 0;
        for (let i = 0; i < containerIndex; i += 1) {
            resultIndex += this.__data[i].items;
        }
        resultIndex += circleIndex;

        return resultIndex;
    }

    get items() {
        return this.__data;
    }

    get itemMaxLength() {
        return this.__ITEM_MAX_LENGTH;
    }
}

export default AmazonCard;
