// TanStack Query v5 (Using nuxt3)
// https://tanstack.com/query/latest/docs/vue/guides/ssr
import type {
    DehydratedState,
    VueQueryPluginOptions,
} from "@tanstack/vue-query";
import {
    VueQueryPlugin,
    QueryClient,
    hydrate,
    dehydrate,
} from "@tanstack/vue-query";

import { defineNuxtPlugin, useState } from "#imports";

export default defineNuxtPlugin((nuxt) => {
    const vueQueryState = useState<DehydratedState | null>("vue-query");

    // Modify your Vue Query global settings here
    const queryClient = new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
    });
    const options: VueQueryPluginOptions = { queryClient };

    nuxt.vueApp.use(VueQueryPlugin, options);

    if (process.server) {
        nuxt.hooks.hook("app:rendered", () => {
            vueQueryState.value = dehydrate(queryClient);
        });
    }

    if (process.client) {
        hydrate(queryClient, vueQueryState.value);
    }
});
