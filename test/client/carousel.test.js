import MainCarousel from "../src/modules/main-carousel.js";

describe("main carousel", () => {
    describe("initialize", () => {
        it("valid length check(2 <= length <= 5) and slice", () => {
            const longItems = [1, 2, 3, 4, 5, 6];
            const shortItems = [];

            const longCarousel = new MainCarousel(containerSelector, longItems);

            expect(longCarousel.items).toHaveLength(longCarousel.itemMaxLength);
            expect(() => {
                const shortCarousel = new MainCarousel(
                    containerSelector,
                    shortItems
                );
            }).toThrow();
        });
    });

    describe("click each card", () => {
        const carousel = new MainCarousel(containerSelector, mockItems);

        it("apply scale-up to one card(card container, image)", () => {});

        it("apply shadow style to one card", () => {});

        it("focus first item (circles)", () => {});

        it("return correct item's index", () => {});
    });

    describe("click each circle in card", () => {
        it("focus circle", () => {});

        it("only one circle is foused", () => {});

        it("return correct item's index", () => {});
    });
});

describe("main carousel", () => {
    describe("initialize", () => {
        it("valid length check(2 <= length <= 5) and slice", () => {
            const longItems = [1, 2, 3, 4, 5, 6];
            const shortItems = [];

            const longCarousel = new MainCarousel(containerSelector, longItems);

            expect(longCarousel.items).toHaveLength(longCarousel.itemMaxLength);
            expect(() => {
                const shortCarousel = new MainCarousel(
                    containerSelector,
                    shortItems
                );
            }).toThrow();
        });
    });

    describe("click each card", () => {
        const carousel = new MainCarousel(containerSelector, mockItems);

        it("apply scale-up to one card(card container, image)", () => {});

        it("apply shadow style to one card", () => {});

        it("focus first item (circles)", () => {});

        it("return correct item's index", () => {});
    });

    describe("click each circle in card", () => {
        it("focus circle", () => {});

        it("only one circle is foused", () => {});

        it("return correct item's index", () => {});
    });
});

describe("main carousel view", () => {
    describe("click arrow or circle", () => {
        it("move to next item", () => {});

        it("move to prev item", () => {});

        it("exec transition", () => {});
    });

    describe("click each circle in card", () => {
        it("move to selected item's view", () => {});

        it("exec transition", () => {});
    });
});
