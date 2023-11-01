// utils/animation.js

export function smoothScroll(element, target, duration) {
    let start = element.scrollTop,
        change = target - start,
        startTime = performance.now(),
        endTime = startTime + duration;

    function animateScroll(currentTime) {
        let elapsedTime = currentTime - startTime;
        let percentage = elapsedTime / duration;
        if (percentage > 1) {
            percentage = 1;
        }

        element.scrollTop = start + change * easeInOutQuad(percentage);

        if (currentTime < endTime) {
            requestAnimationFrame(animateScroll);
        }
    }

    requestAnimationFrame(animateScroll);
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
