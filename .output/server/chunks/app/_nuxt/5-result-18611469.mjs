import { _ as __nuxt_component_0 } from './SelectBox-58511d20.mjs';
import { useSSRContext } from 'vue';
import { d as defineNuxtComponent } from './component-c219d0e5.mjs';
import { m as mapState, f as useAuthService, _ as _export_sfc } from '../server.mjs';
import { u as useSignupStore } from './signup-553a9907.mjs';
import { ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineNuxtComponent({
  name: "4-Mbti",
  setup() {
  },
  data() {
    return {
      mbtiList: [
        "INTJ",
        "INTP",
        "ENTJ",
        "ENTP",
        "INFJ",
        "INFP",
        "ENFJ",
        "ENFP",
        "ISTJ",
        "ISFJ",
        "ESTJ",
        "ESFJ",
        "ISTP",
        "ISFP",
        "ESTP",
        "ESFP"
      ]
    };
  },
  computed: {
    ...mapState(useSignupStore, ["user", "step"])
  },
  mounted() {
    console.log(this.step);
    if (this.step !== 4) {
      this.$router.push(`/signup/1-nickname`);
    }
  },
  methods: {
    async signup() {
      console.log(this.user);
      const { signup } = useAuthService();
      const res = await signup(this.user);
      console.log(res);
      if (res.success) {
        this.$router.push(`/home`);
      }
    }
  }
}, "$SZjRSntgD1");
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_select_box = __nuxt_component_0;
  _push(`<!--[--><div class="title">${ssrInterpolate(_ctx.user.nickname)} \uB2D8\uC758 \uC815\uBCF4\uAC00 \uB9DE\uB098\uC694?</div><div class="input-box"><div class="title">Mbti</div>`);
  _push(ssrRenderComponent(_component_select_box, {
    options: _ctx.mbtiList,
    disabled: true,
    default: _ctx.user.mbti
  }, null, _parent));
  _push(`</div><div class="input-box"><div class="title">\uC131\uBCC4</div>`);
  _push(ssrRenderComponent(_component_select_box, {
    options: ["\uB0A8", "\uC5EC"],
    disabled: true,
    default: _ctx.user.gender
  }, null, _parent));
  _push(`</div><div class="input-box"><div class="title">\uB098\uC774</div><input type="number"${ssrRenderAttr("value", _ctx.user.age)} disabled></div><div class="input-box"><div class="title">\uB2C9\uB124\uC784</div><input type="text"${ssrRenderAttr("value", _ctx.user.nickname)} disabled></div><div class="button fixed-bottom">\uC785\uC7A5\uD558\uAE30</div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signup/5-result.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _5Result = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _5Result as default };
//# sourceMappingURL=5-result-18611469.mjs.map
