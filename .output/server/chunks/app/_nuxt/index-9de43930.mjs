import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc, f as useAuthService } from '../server.mjs';
import 'vue-bundle-renderer/runtime';
import 'h3';
import 'devalue';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'klona';
import 'defu';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'http-graceful-shutdown';
import 'unctx';
import 'vue-router';
import 'cookie-es';
import 'axios';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'dayjs';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/utc.js';
import 'mitt';

const kakaoLogo = "" + buildAssetsURL("button_kakao_login.7379bc26.svg");
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useAuthService();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "viewport" }, _attrs))} data-v-7e2fe58d><div class="title-box" data-v-7e2fe58d><div class="title" data-v-7e2fe58d>\uB2F9\uC2E0\uC758 \uACF5\uAC04\uC73C\uB85C <br data-v-7e2fe58d>\uCD08\uB300\uD569\uB2C8\uB2E4!</div><div class="subtitle" data-v-7e2fe58d>\uB098\uB97C \uC704\uD55C \uAE30\uB85D\uC744 \uC2DC\uC791\uD574\uBCF4\uC138\uC694.</div></div><img${ssrRenderAttr("src", unref(kakaoLogo))} class="button fixed-bottom" data-v-7e2fe58d></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signin/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7e2fe58d"]]);

export { index as default };
//# sourceMappingURL=index-9de43930.mjs.map
