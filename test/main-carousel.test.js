import MainCarousel from "../src/modules/main-carousel.js";

const containerSelector = "main-carousel";
const mockItems = {
    Ship: [
        {
            image:
                "https:////images-na.ssl-//images-amazon.com///images/G/01/marketing/prime/detail_page/Card_A01._CB514650866_.jpg",
            title: "FAST, FREE DELIVERY",
            head: "Fast, FREE delivery on over 100 million items",
            body:
                "Super-fast delivery, tens of millions of items, and flexible delivery options to fit your life. Plus, Prime members get FREE One-Day Delivery on tens of millions of items.",
            tail: "Explore Prime Delivery",
            link: "https://www.amazon.com/b?node=15247183011"
        },
        {
            image:
                "https:////images-na.ssl-//images-amazon.com///images/G/01/marketing/prime/detail_page/Card_A02._CB514650866_.jpg",
            title: "SAME-DAY DELIVERY",
            head: "FREE Same-Day Delivery",
            body:
                "Prime members get FREE Same-Day Delivery on over three million items with qualifying orders.",
            tail: "Explore Same-Day Delivery",
            link: "https://www.amazon.com/b?node=8729023011"
        },
        {
            image:
                "https:////images-na.ssl-//images-amazon.com///images/G/01/marketing/prime/detail_page/Card_A03._CB514650829_.jpg",
            title: "RELEASE DAY DELIVERY",
            head: "Skip the lines and get it on release day",
            body:
                "No more waiting in line! Choose Free Release-Date Delivery at checkout on qualified items, and your package will be delivered on the release day by 7pm.",
            tail: "Explore Release-Date Delivery",
            link: "https://www.amazon.com/b?node=16067347011"
        },
        {
            image:
                "https:////images-na.ssl-//images-amazon.com///images/G/01/marketing/prime/detail_page/Card_A04._CB494909365_.jpg",
            title: "PRIME NOW",
            head: "Ultrafast delivery on thousands of items",
            body:
                "Prime Now offers household items and essentials you need everyday plus the best of Amazon, delivered to your doorstep. Choose 2-hour delivery or 1-hour delivery in select cities.",
            tail: "Explore Prime Now",
            link: "https://primenow.amazon.com/onboard?sourceUrl=%2F"
        }
    ],
    Stream: [
        {
            image:
                "https:////images-na.ssl-//images-amazon.com///images/G/01/marketing/prime/detail_page/Card_B01._CB457663232_.jpg",
            title: "PRIME VIDEO",
            head: "Watch movies, TV, live events, and more",
            body:
                "As a Prime member, you can watch exclusive Amazon Originals and thousands of popular movies and TV shows—all at no extra cost. Watch at home or on the go with practically any device.",
            tail: "Explore Prime Video",
            link:
                "https://www.amazon.com/b/ref=dvm_us_aq_np_dhb_be_optpvt1?node=2858778011"
        },
        {
            image:
                "https:////images-na.ssl-//images-amazon.com///images/G/01/marketing/prime/detail_page/Card_B02._CB513839286_.jpg",
            title: "TWITCH PRIME",
            head: "Free Games & Loot with Twitch Prime",
            body:
                "Gamers can get free games, in-game items, a free Twitch channel subscription every month and more with Twitch Prime.",
            tail: "Explore Twitch Prime",
            link: "https://twitch.amazon.com/prime"
        },
        {
            image:
                "https:////images-na.ssl-//images-amazon.com///images/G/01/marketing/prime/detail_page/Card_B03._CB513839286_.jpg",
            title: "PRIME MUSIC",
            head: "Millions of songs for every moment",
            body:
                "As a Prime member, you can stream over 2 million songs ad free, listen on any Echo device, and take your music anywhere with offline listening.",
            tail: "Explore Prime Music",
            link:
                "https://www.amazon.com/gp/dmusic/promotions/PrimeMusic?ref=hawkfire_prime_detail_page_benefit_desc"
        },
        {
            image:
                "https:////images-na.ssl-//images-amazon.com///images/G/01/digital/video/merch/2018/Other/AVD12272_PrimeContentUpdate/Card_B04_AVD12272_PrimeContentUpdate_1280x400_en_US._CB474157036_.jpg",
            title: "AMAZON ORIGINALS",
            head: "Enjoy Amazon Original series and more",
            body:
                "Watch award-winning Amazon Originals like The Marvelous Mrs. Maisel, as well as exclusive series available only with Prime, including Goliath, Sneaky Pete, and The Grand Tour.",
            tail: "Explore Amazon Originals",
            link:
                "https://www.amazon.com/gp/video/storefront/ref=dvm_us_aq_np_dhb_be_optorigt1?ie=UTF8&merchId=originals1"
        },
        {
            image:
                "https:////images-na.ssl-//images-amazon.com///images/G/01/marketing/prime/detail_page/Card_B05._CB514650828_.jpg",
            title: "AUDIBLE CHANNELS",
            head: "Original audio programs for life on the go",
            body:
                "Audible Channels are free with your Prime membership. Enjoy original audio series and playlists handcrafted for every interest. Just download the Audible app and start listening.",
            tail: "Explore Audible Channels",
            link: "https://www.audible.com/mt/getchannels"
        }
    ]
};

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
