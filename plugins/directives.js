/**
 * directives.ts
 * 커스텀 디렉티브
 */

// v-lazyload (참고: https://url.kr/l5bxa1)
const lazyloadDirective = {
    mounted(el, binding) {
        function loadImage(targetElement, imageUrl) {
            const imgElement = targetElement;
            imgElement.setAttribute("src", imageUrl);
        }

        function callIntersectionApi() {
            const options = {
                root: null,
                threshold: 0.5,
                rootMargin: "0px",
            };

            const callback = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        loadImage(entry.target, binding.value);
                        observer.unobserve(entry.target);
                    }
                });
            };

            const lazyLoadingIO = new IntersectionObserver(callback, options);
            lazyLoadingIO.observe(el);
        }

        // 지원하는 경우에만 Observe
        window.IntersectionObserver ? callIntersectionApi() : loadImage(el);
    },
};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("lazyload", lazyloadDirective);
});
