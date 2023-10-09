import VCalendar from "v-calendar";
import "~/assets/scss/v-calendar.css";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VCalendar);
});
