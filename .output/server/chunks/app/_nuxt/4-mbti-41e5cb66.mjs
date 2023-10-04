import { _ as __nuxt_component_0 } from './SelectBox-58511d20.mjs';
import { useSSRContext } from 'vue';
import { d as defineNuxtComponent } from './component-c219d0e5.mjs';
import { m as mapState, _ as _export_sfc } from '../server.mjs';
import { u as useSignupStore } from './signup-553a9907.mjs';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
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
      mbti: "",
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
    ...mapState(useSignupStore, ["user", "step"]),
    isValidate() {
      return this.mbti !== "";
    }
  },
  mounted() {
    if (this.step !== 3) {
      this.$router.push(`/signup/1-nickname`);
    }
  },
  methods: {
    saveMbti() {
      if (!this.isValidate) {
        alert("\uB098\uC774\uB294 1\uAE00\uC790 \uC774\uC0C1\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4.");
        return;
      }
      const { setMbti, setStep } = useSignupStore();
      setMbti(this.mbti);
      setStep(4);
      this.$router.push(`/signup/5-result`);
    }
  }
}, "$QWkx19ugfQ");
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_select_box = __nuxt_component_0;
  _push(`<!--[--><div class="title" data-v-d4cc85dd>Mbti\uB97C \uC54C\uB824\uC8FC\uC138\uC694</div><div class="description" data-v-d4cc85dd>\uB354 \uC815\uD655\uD55C \uBD84\uC11D\uC774 \uAC00\uB2A5\uD574\uC694!</div><div class="input-box" data-v-d4cc85dd><div class="title" data-v-d4cc85dd>Mbti</div>`);
  _push(ssrRenderComponent(_component_select_box, {
    options: _ctx.mbtiList,
    onInput: (selected) => _ctx.mbti = selected
  }, null, _parent));
  _push(`</div><div class="input-box" data-v-d4cc85dd><div class="title" data-v-d4cc85dd>\uC131\uBCC4</div>`);
  _push(ssrRenderComponent(_component_select_box, {
    options: ["\uB0A8", "\uC5EC"],
    disabled: true,
    default: _ctx.user.gender
  }, null, _parent));
  _push(`</div><div class="input-box" data-v-d4cc85dd><div class="title" data-v-d4cc85dd>\uB098\uC774</div><input type="number"${ssrRenderAttr("value", _ctx.user.age)} disabled data-v-d4cc85dd></div><div class="input-box" data-v-d4cc85dd><div class="title" data-v-d4cc85dd>\uB2C9\uB124\uC784</div><input type="text"${ssrRenderAttr("value", _ctx.user.nickname)} disabled data-v-d4cc85dd></div><div class="${ssrRenderClass([{ disabled: !_ctx.isValidate }, "button fixed-bottom"])}" data-v-d4cc85dd> \uB2E4\uC74C </div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/signup/4-mbti.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _4Mbti = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d4cc85dd"]]);

export { _4Mbti as default };
//# sourceMappingURL=4-mbti-41e5cb66.mjs.map
