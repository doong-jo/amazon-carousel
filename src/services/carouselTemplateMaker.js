import _ from "../util/constants.js";
import { caculateStartPosOfCarousel } from "../util/calculator.js";

const makeSortSlideImages = slideImgs => {
    let indexArr = [];
    const sortSlideImgs = [];
    const startPos = caculateStartPosOfCarousel(slideImgs.length);

    for (let i = startPos + 1; i < slideImgs.length; i++) {
        sortSlideImgs.push(slideImgs[i]);
        indexArr.push(i);
    }

    for (let i = 0; i <= startPos; i++) {
        sortSlideImgs.push(slideImgs[i]);
        indexArr.push(i);
    }

    return { sortSlideImgs, indexArr };
};

const CarouselTemplateMaker = {
    makeMini(data, startPosX) {
        const { sortSlideImgs } = makeSortSlideImages(data.children);

        const slideImgs = sortSlideImgs.reduce((acc, cur) => {
            const { link, img } = cur;
            acc += /* html */ `<a class="scroller-slide scroller-view__a" href="${link}">
            <img class="scroller-view__img" src="${img}"/>
            </a>`;
            return acc;
        }, "");

        const miniTemplate = /* html */ `
        <div class="mini-carousel-container">
            <div class="scroller-container">
                <div class="scroller-arrow"></div>
                <div class="scroller-view">
                    <div class="scroller-slide-list" style="transform: translateX(-${startPosX}rem)">
                        ${slideImgs}
                    </div>
                </div>
                <div class="scroller-arrow"></div>
            </div>
            <div class="between-scroller-content"></div>
            <div class="content">
                <div class="title">
                    ${data.content.title}
                </div>
                <div class="body">
                    ${data.content.body}
                </div>
                <a href="${data.content.link}">
                    <div class="footer">
                        <span>${data.content.footer}</span>
                    </div>
                </a>
            </div>
        </div>`;

        return miniTemplate;
    },

    makeFull(data, startPosX) {
        let slideImgs = [];
        data.forEach(v => {
            v.forEach(item => {
                slideImgs.push(item);
            });
        });
        const { sortSlideImgs, indexArr } = makeSortSlideImages(slideImgs);

        const slideHtml = sortSlideImgs.reduce((acc, cur, i) => {
            acc += /* html */ `
            <div class="scroller-slide img" data-index="${indexArr[i]}" style="background-image: url(${cur.image});">
                <div class="content">
                    <div class="badage">
                        ${cur.badage}
                    </div>
                    <div class="title">
                        ${cur.title}
                    </div>
                    <div class="body">
                        ${cur.body}
                    </div>
                    <a href="${cur.link}">
                        <div class="footer">
                            <span>${cur.footer}</span>
                        </div>
                    </a>
                </div>
            </div>`;
            return acc;
        }, "");

        const fullTemplate = /* html */ `
        <div class="full-carousel-container">
            <div class="scroller-container">
                <div class="scroller-arrow"></div>
                <div class="scroller-view">
                    <div class="scroller-slide-list" style="transform: translateX(-${startPosX}rem)">
                        ${slideHtml}
                    </div>
                </div>
                <div class="scroller-arrow"></div>
            </div>
        </div>`;
        return fullTemplate;
    }
};

export default CarouselTemplateMaker;