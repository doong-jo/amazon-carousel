import {
    $$,
    findChild,
    findChildren,
    on,
    setStyle,
    setHTML
} from "../util/light-dom.js";
import _ from "../util/constants.js";
import { caculateStartPosOfCarousel } from "../util/calculator.js";
import templateMaker from "../services/carouselTemplateMaker.js";

class Carousel {
    constructor(containerSelector, data, options) {
        this.__data = data;
        this.__container = $$(containerSelector);

        this.__TYPE_MINI = "mini";
        this.__TYPE_FULL = "full";
        this.__WIDTH_MINI_CAROUSEL_SLIDE = 14;
        this.__WIDTH_FULL_CAROUSEL_SLIDE = 55;
        this.__DIR_LEFT = "left";
        this.__DIR_RIGHT = "right";
        this.__CLASS_ARROW = "scroller-arrow";
        this.__CLASS_SLIDE_LIST = "scroller-slide-list";
        this.__CLASS_SLIDE = "scroller-slide";
        this.__ATTR_INDEX = "data-index";

        this.__options = {
            type: this.__TYPE_MINI,
            prevButton: true,
            nextButton: true,
            slideSpeed: 300,
            lazyload: false,
            mouseDrag: false,
            arrowKeys: false,
            autoPlay: false,
            autoPlaySpeed: 3000,
            stopWhenPageHidden: false
        };
        this.applyOptions(options);
        if (this.__options.type === this.__TYPE_FULL) {
            this.__CLASS_CAROUSEL_CONTAINER = "full-carousel-container";
            this.__slideWidth = this.__WIDTH_FULL_CAROUSEL_SLIDE;
        } else if (this.__options.type === this.__TYPE_MINI) {
            this.__CLASS_CAROUSEL_CONTAINER = "mini-carousel-container";
            this.__slideWidth = this.__WIDTH_MINI_CAROUSEL_SLIDE;
        }
        this.__container = $$(containerSelector);
        this.__lastDirection;
        this.__jumpCnt = 1;

        this.clickArrowHandler = this.clickArrowHandler.bind(this);
        this.transitionEndOfSlideList = this.transitionEndOfSlideList.bind(
            this
        );

        this.makeElements(this.__options.type);
        this.makeElementVariables();
        this.setPropertyOfOptions(this.__options);
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

    setPropertyOfOptions(options) {
        setStyle(
            this.__slideList,
            "transition",
            `transform ${options.slideSpeed}ms`
        );

        this.playAuto();

        if (options.stopWhenPageHidden) {
            watchPageVisibility(this.playAuto, () => {
                clearInterval(this.__autoPlayAlarm);
            });
        }
    }

    makeElements(type) {
        const countSlidesOfFullType = data => {
            const totalCount = data.reduce((acc, cur) => {
                acc = acc + cur.length;
                return acc;
            }, 0);

            return totalCount;
        };

        let resultOfCarousel;
        if (type === this.__TYPE_FULL) {
            this.__cursorPosX = caculateStartPosOfCarousel(
                countSlidesOfFullType(this.__data),
                this.__WIDTH_FULL_CAROUSEL_SLIDE
            );
            resultOfCarousel = templateMaker.makeFull(
                this.__data,
                this.__cursorPosX
            );
        } else if (type === this.__TYPE_MINI) {
            this.__cursorPosX = caculateStartPosOfCarousel(
                this.__data.children.length,
                this.__WIDTH_MINI_CAROUSEL_SLIDE
            );
            resultOfCarousel = templateMaker.makeMini(
                this.__data,
                this.__cursorPosX
            );
        }
        setHTML(this.__container, resultOfCarousel);
    }

    makeElementVariables() {
        const arrows = findChildren(this.__container, `.${this.__CLASS_ARROW}`);
        this.__leftArrow = arrows[0];
        this.__rightArrow = arrows[1];
        this.__slideList = findChild(
            this.__container,
            `.${this.__CLASS_SLIDE_LIST}`
        );
    }

    setListeners() {
        on(this.__leftArrow, "click", this.clickArrowHandler(this.__DIR_LEFT));
        on(
            this.__rightArrow,
            "click",
            this.clickArrowHandler(this.__DIR_RIGHT)
        );
        on(this.__slideList, "transitionend", this.transitionEndOfSlideList);
    }

    transitionEndOfSlideList(e) {
        console.log("transition end!");
        requestAnimationFrame(() => {
            setStyle(this.__slideList, "transition", "");

            const directionExec = {};

            directionExec[this.__DIR_LEFT] = () => {
                let moveSlide;
                const slides = findChildren(
                    this.__container,
                    `.${this.__CLASS_SLIDE}`
                );
                moveSlide = slides[slides.length - 1];
                const cloneSlide = moveSlide.cloneNode(true);
                this.__slideList.insertAdjacentElement(
                    "afterbegin",
                    cloneSlide
                );
                moveSlide.remove();
            };
            directionExec[this.__DIR_RIGHT] = () => {
                const firstSlide = findChild(
                    this.__container,
                    `.${this.__CLASS_SLIDE}`
                );
                const cloneSlide = firstSlide.cloneNode(true);
                this.__slideList.insertAdjacentElement("beforeend", cloneSlide);
                firstSlide.remove();
            };
            for (let i = 0; i < this.__jumpCnt; i++) {
                directionExec[this.__lastDirection]();
            }
            this.__jumpCnt = 1;

            setStyle(
                this.__slideList,
                "transform",
                `translateX(-${this.__cursorPosX}rem)`
            );
        });
    }

    clickArrowHandler(direction) {
        return function(e) {
            this.playAuto();
            const directionExec = {};
            directionExec[this.__DIR_LEFT] = () => {
                this.prevSlide();
            };
            directionExec[this.__DIR_RIGHT] = () => {
                this.nextSlide();
            };
            directionExec[direction]();
        }.bind(this);
    }

    playAuto() {
        if (!this.__options.autoPlay) {
            return;
        }
        if (this.__autoPlayAlarm) {
            clearInterval(this.__autoPlayAlarm);
        }

        this.__autoPlayAlarm = setInterval(
            this.nextSlide.bind(this),
            this.__options.autoPlaySpeed
        );
    }

    prevSlide() {
        this.__lastDirection = this.__DIR_LEFT;
        setStyle(
            this.__slideList,
            "transition",
            `transform ${this.__options.slideSpeed}ms`
        );
        setStyle(
            this.__slideList,
            "transform",
            `translateX(${-this.__cursorPosX + this.__slideWidth}rem)`
        );
    }

    nextSlide() {
        this.__lastDirection = this.__DIR_RIGHT;
        setStyle(
            this.__slideList,
            "transition",
            `transform ${this.__options.slideSpeed}ms`
        );
        setStyle(
            this.__slideList,
            "transform",
            `translateX(-${this.__cursorPosX + this.__slideWidth}rem)`
        );
    }

    getCurrentSlideIndex(slides) {
        const curPos = caculateStartPosOfCarousel(slides.length);
        const curIndex = slides[curPos].getAttribute(this.__ATTR_INDEX);
        return +curIndex;
    }

    moveToSlide(destIndex) {
        const slides = findChildren(this.__container, `.${this.__CLASS_SLIDE}`);
        const curIndex = this.getCurrentSlideIndex(slides);
        if (destIndex === curIndex) {
            return;
        }

        let moveCnt = 0;
        let moveDir = 0;
        let isMeetDestIndex = false;
        let isMeetCurIndex = false;

        // console.log("destIndex", destIndex);
        // console.log("curIndex", curIndex);
        for (let i = 0; i < slides.length; i++) {
            const slideIndex = +slides[i].getAttribute(this.__ATTR_INDEX);
            if (isMeetDestIndex && isMeetCurIndex) {
                break;
            }

            if (isMeetDestIndex || isMeetCurIndex) {
                moveCnt += moveDir;
            }

            if (destIndex === slideIndex) {
                isMeetDestIndex = true;
                moveDir = 1;
            } else if (curIndex === slideIndex) {
                isMeetCurIndex = true;
                moveDir = -1;
            }
        }

        this.jumpToSlide(moveCnt);
    }

    jumpToSlide(moveCnt) {
        console.log("moveCnt", moveCnt);
        if (moveCnt === 0) {
            return;
        }

        const distance = moveCnt * this.__slideWidth;
        this.__lastDirection = moveCnt > 0 ? this.__DIR_LEFT : this.__DIR_RIGHT;
        this.__jumpCnt = Math.abs(moveCnt);

        setStyle(
            this.__slideList,
            "transition",
            `transform ${this.__options.slideSpeed}ms`
        );
        setStyle(
            this.__slideList,
            "transform",
            `translateX(${-this.__cursorPosX + distance}rem)`
        );
    }
}

export default Carousel;
