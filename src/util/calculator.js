export function caculateStartPosOfCarousel(total, eachWidth = 1) {
    // (전체 개수 / 2) - (짝수 ? -1 : 0) * 개당 너비
    return (Math.floor(total / 2) - +!(total & 1)) * eachWidth;
}

export default { caculateStartPosOfCarousel };
