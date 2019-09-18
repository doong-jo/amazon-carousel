module.exports = class Observable {
    constructor(props) {}
    // Referecne : https://bit.ly/2kmsZSP
    subscribe(event_name, handler, context) {
        if (this.handlers == undefined) {
            this.handlers = {};
        }
        if (this.handlers.hasOwnProperty(event_name) == false) {
            this.handlers[event_name] = [];
        }

        let handle_arr = this.handlers[event_name];
        handle_arr.push({
            handler,
            context
        });
    }

    notify(eventName, data) {
        var handlerArray = this.handlers[eventName];
        if (undefined === handlerArray) return;

        for (var hidx = 0; hidx < handlerArray.length; hidx++) {
            var currentHandler = handlerArray[hidx];

            // call함수를 통해 this를 context로, data를 인자로 넘긴다.
            currentHandler.handler.call(currentHandler.context, data);
        }
    }
};
