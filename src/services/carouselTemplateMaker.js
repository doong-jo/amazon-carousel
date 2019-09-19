const CarouselTemplateMaker = {
    makeMini(data) {
        const { children } = data;
        const slideImgs = children.reduce((acc, cur) => {
            const { link, img } = cur;
            acc += /* html */ `<a class="scroller-view__a" href="${link}">
            <img class="scroller-view__img" src="${img}"/>
            </a>`;
            return acc;
        }, "");

        const miniTemplate = /* html */ `
        <div class="mini-carousel-container">
            <div class="scroller-container">
                <div class="scroller-arrow"></div>
                <div class="scroller-view">
                    <div class="scroller-slide">
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

    makeFull(data) {
        console.log(data);
        const fullTemplate = /* html */ `
        <div class="full-carousel-container">
            <div class="scroller-container">
                <div class="scroller-arrow"></div>
                <div class="scroller-view">
                    <div class="scroller-slide">
                        <div class="img">
                            <div class="content">
                                <div class="badage">
                                    FAST, FREE DELIVERY
                                </div>
                                <div class="title">
                                    Fast, FREE delivery on over 100 million items
                                </div>
                                <div class="body">
                                    Super-fast delivery, tens of millions of items, and flexible delivery options to fit your life. Plus, Prime members get FREE One-Day Delivery on tens of millions of items.
                                </div>
                                <a href="/">
                                    <div class="footer">
                                        <span>Explore Prime Delivery</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="img">
                            <div class="content">
                                <div class="badage">
                                    FAST, FREE DELIVERY
                                </div>
                                <div class="title">
                                    Fast, FREE delivery on over 100 million items
                                </div>
                                <div class="body">
                                    Super-fast delivery, tens of millions of items, and flexible delivery options to fit your life. Plus, Prime members get FREE One-Day Delivery on tens of millions of items.
                                </div>
                                <a href="/">
                                    <div class="footer">
                                        <span>Explore Prime Delivery</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="scroller-arrow"></div>
            </div>
        </div>`;
        return fullTemplate;
    }
};

export default CarouselTemplateMaker;
