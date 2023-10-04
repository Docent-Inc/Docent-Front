import { m as mapState, _ as _export_sfc } from '../server.mjs';
import { u as useSignupStore } from './signup-553a9907.mjs';
import { resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
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
  name: "SignupLayout",
  data() {
    return {};
  },
  computed: {
    ...mapState(useSignupStore, ["step"]),
    progress() {
      console.log(this.step / 4 * 100);
      return this.step / 4 * 100;
    }
  },
  methods: {
    goBack() {
      const { setStep } = useSignupStore();
      setStep(this.step - 1);
      this.$router.back();
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_v_icon = resolveComponent("v-icon");
  const _component_v_progress_linear = resolveComponent("v-progress-linear");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "viewport" }, _attrs))} data-v-63ae759a><div class="header" data-v-63ae759a>`);
  _push(ssrRenderComponent(_component_v_icon, {
    class: "ic_back",
    onClick: $options.goBack
  }, null, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_v_progress_linear, {
    modelValue: $options.progress,
    "onUpdate:modelValue": ($event) => $options.progress = $event,
    "animation-speed": "1300",
    height: "2",
    style: { "position": "fixed" }
  }, null, _parent));
  _push(`<div class="contents" data-v-63ae759a>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/signup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const signup = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-63ae759a"]]);

export { signup as default };
//# sourceMappingURL=signup-74023bc4.mjs.map
