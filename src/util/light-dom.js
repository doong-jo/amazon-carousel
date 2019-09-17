const $$ = document.querySelector;

const $$$ = document.querySelectorAll;

const addClass = (elem, className) => {
    const { classList } = elem;
    classList.add(className);
};
const removeClass = (elem, className) => {
    const { classList } = elem;
    classList.remove(className);
};

const containClass = (elem, className) => {
    const { classList } = elem;
    const contains = classList.contains(className);
    return contains;
};

const replaceHref = href => {
    document.location.href = href;
};

const create = tagName => {
    const elem = document.createElement(tagName);
    return elem;
};

const onAll = (elemArr, eventName, fn) => {
    for (const elem of elemArr) {
        elem.addEventListener(eventName, fn);
    }
};

const on = (elem, eventName, fn) => {
    elem.addEventListener(eventName, fn);
};

const off = (el, action, fn) => {
    el.removeEventListener(action, fn);
};

const setStyle = (el, proptName, proptVal) => {
    el.style[proptName] = proptVal;
};

const hasAttribute = (el, attr) => {
    return el.hasAttribute(attr);
};

const getAttribute = (el, attr) => {
    return el.getAttribute(attr);
};

const setAttribute = (el, attr, val) => {
    el.setAttribute(attr, val);
};

const removeAttribute = (el, attr) => {
    el.removeAttribute(attr);
};

const setHTML = (el, html) => {
    el.innerHTML = html;
};

export default {
    $$,
    $$$,
    addClass,
    removeClass,
    containClass,
    replaceHref,
    create,
    on,
    onAll,
    off,
    setStyle,
    hasAttribute,
    getAttribute,
    setAttribute,
    removeAttribute,
    setHTML
};
