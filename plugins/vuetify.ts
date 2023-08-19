import { createVuetify, ThemeDefinition } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const LightTheme: ThemeDefinition = {
    dark: false,
    variables: {},
    colors: {
        primary: "#4376fb",
        accent: "#757575",
        secondary: "#FF8F00",
        info: "#26A69A",
        warning: "#FFC107",
        error: "#bb252a",
        success: "#4CAF50",
    },
};

export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            // 테마 설정
            themes: {
                light: LightTheme,
                variables: {},
            },
        },
        icons: {
            // 아이콘 설정
            defaultSet: "mdi",
            aliases,
            sets: {
                mdi,
            },
        },
    });

    nuxtApp.vueApp.use(vuetify);
});
