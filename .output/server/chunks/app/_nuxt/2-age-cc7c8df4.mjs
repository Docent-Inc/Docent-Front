import { useSSRContext } from 'vue';
import { d as defineNuxtComponent } from './component-c219d0e5.mjs';
import { m as mapState, _ as _export_sfc } from '../server.mjs';
import { u as useSignupStore } from './signup-553a9907.mjs';
import { ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
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
  name: "1-Nickname",
  setup() {
  },
  data() {
    return {
      age: ""
    };
  },
  computed: {
    ...mapState(useSignupStore, ["user", "step"]),
    isValidate() {
      return this.age !== "";
    }
  },
  mounted() {
    if (this.step !== 1) {
      this.$router.push(`/signup/1-nickname`);
    }
  },
  methods: {
    saveAge() {
      if (!this.isValidate) {
        alert("\uB098\uC774\uB294 1\uAE00\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.");
        return;
      }
      const { setAge, setStep } = useSignupStore();
      setAge(this.age);
      setStep(2);
      this.$router.push(`/signup/3-gender`);
    }
  }
}, "$QGg4bvqEht");
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><div class="title">\uB098\uC774\uB97C \uC54C\uB824\uC8FC\uC138\uC694</div><div class="input-box"><div class="title">\uB098\uC774</div><input type="number"${ssrRenderAttr("value", _ctx.age)}></div><div class="input-box"><div class="title">\uB2C9\uB124\uC784</div><input type="text"${ssrRenderAttr("value", _ctx.user.nickname)} disabled></div><div class="${ssrRenderClass([{ disabled: !_ctx.isValidate }, "button fixed-bottom"])}"> \uB2E4\uC74C </div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signup/2-age.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _2Age = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _2Age as default };
//# sourceMappingURL=2-age-cc7c8df4.mjs.map
