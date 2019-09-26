export class Router {
    constructor(routes, rootElement) {
        this.routes = routes;
        this.rootElement = rootElement;
        this.hashChanged();
        window.onhashchange = this.hashChanged.bind(this);
    }

    hashChanged() {
        const routeName =
            window.location.hash.length > 0
                ? window.location.hash.substr(1)
                : "default";
        this.navigate(routeName);
    }

    async navigate(routeName) {
        this.rootElement.innerHTML = this.routes[routeName].getView();
        await this.routes[routeName].render();
    }
}
