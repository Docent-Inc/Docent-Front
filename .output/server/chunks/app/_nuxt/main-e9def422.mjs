import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { useSSRContext, mergeProps, resolveComponent, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
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

const DOCENTSVG = "" + buildAssetsURL("nav_docent.f862c49b.svg");
const _sfc_main$1 = {
  name: "Navigation",
  data() {
    return {
      docentSVG: DOCENTSVG
    };
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    isActive(route) {
      return this.$route.path === route;
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_v_btn = resolveComponent("v-btn");
  const _component_v_icon = resolveComponent("v-icon");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "navigation" }, _attrs))} data-v-eadac408>`);
  _push(ssrRenderComponent(_component_v_btn, {
    flat: "",
    onClick: ($event) => $options.navigateTo(`/home`)
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_v_icon, {
          class: ["nav_home", { active: $options.isActive("/home") }]
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_v_icon, {
            class: ["nav_home", { active: $options.isActive("/home") }]
          }, null, 8, ["class"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_v_btn, {
    flat: "",
    onClick: ($event) => $options.navigateTo(`/gallery`)
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_v_icon, {
          class: ["nav_gallery", { active: $options.isActive("/gallery") }]
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_v_icon, {
            class: ["nav_gallery", { active: $options.isActive("/gallery") }]
          }, null, 8, ["class"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_v_btn, {
    flat: "",
    onClick: ($event) => $options.navigateTo(`/chat`)
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<img${ssrRenderAttr("src", $data.docentSVG)} data-v-eadac408${_scopeId}>`);
      } else {
        return [
          createVNode("img", { src: $data.docentSVG }, null, 8, ["src"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_v_btn, {
    flat: "",
    onClick: ($event) => $options.navigateTo(`/calendar`)
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_v_icon, {
          class: ["nav_calendar", { active: $options.isActive("/calendar") }]
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_v_icon, {
            class: ["nav_calendar", { active: $options.isActive("/calendar") }]
          }, null, 8, ["class"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_v_btn, {
    flat: "",
    onClick: ($event) => $options.navigateTo(`/report`)
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_v_icon, {
          class: ["nav_report", { active: $options.isActive("/report") }]
        }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_v_icon, {
            class: ["nav_report", { active: $options.isActive("/report") }]
          }, null, 8, ["class"])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navigation.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-eadac408"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Navigation = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "viewport" }, _attrs))} data-v-b9b3583a><div class="layout" data-v-b9b3583a>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
  _push(ssrRenderComponent(_component_Navigation, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/main.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const main = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-b9b3583a"]]);

export { main as default };
//# sourceMappingURL=main-e9def422.mjs.map
