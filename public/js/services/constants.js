const Constants = {
    HOST: `http://${document.location.hostname}`,

    METHOD: {
        GET: "GET",
        POST: "POST",
        PUT: "PUT"
    },

    HEADER_TYPE_JSON: { "Content-Type": "application/json" },

    URL: {
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        SIGNUP: "/user/signup",
        EXIST: "/user/exists",
        PASSPORT: "/auth/passport",
        MINI_CAROUSEL: "/carousel/mini-carousel",
        MAIN_CAROUSEL: "/carousel/main-carousel",
        CARD: "/carousel/card"
    },

    PAGE_HASH: {
        LOGIN: "/",
        SIGNUP: "./#signup",
        MAIN: "./#main"
    }
};

export default Constants;
