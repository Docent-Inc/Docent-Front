import VCalendar from "v-calendar";
import "~/assets/scss/v-calendar.scss";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VCalendar);
});
