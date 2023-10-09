import { resolveComponent, mergeProps, useSSRContext } from 'vue';
import { _ as _export_sfc, f as useAuthService, g as useRoute, u as useRouter$1 } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'h3';
import 'ufo';
import 'cookie-es';
import 'destr';
import 'ohash';
import 'axios';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import 'mitt';
import 'defu';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'klona';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthService();
    useRoute();
    useRouter$1();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_progress_circular = resolveComponent("v-progress-circular");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "viewport" }, _attrs))} data-v-3ab5b639>`);
      _push(ssrRenderComponent(_component_v_progress_circular, {
        indeterminate: "",
        color: "#2C9577"
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/kakao/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3ab5b639"]]);

export { index as default };
//# sourceMappingURL=index-f92a169d.mjs.map
