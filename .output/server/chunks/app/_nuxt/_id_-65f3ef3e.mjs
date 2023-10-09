import { u as useDiaryService } from './diary-67271a1a.mjs';
import { resolveComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
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
  name: "Memo",
  data() {
    return {
      memo: {}
    };
  },
  async mounted() {
    const memo_id = this.$route.params.id;
    const { getMemo } = useDiaryService();
    const res = await getMemo(memo_id);
    this.memo = res.data.memo;
  },
  computed: {},
  methods: {}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_v_icon = resolveComponent("v-icon");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "viewport" }, _attrs))} data-v-298f16c0><div class="header" data-v-298f16c0>`);
  _push(ssrRenderComponent(_component_v_icon, {
    class: "ic_back_primary",
    onClick: ($event) => this.$router.back()
  }, null, _parent));
  _push(`<span class="memo" data-v-298f16c0>Memo</span></div><div class="contents" data-v-298f16c0><div class="memo-title" data-v-298f16c0>${ssrInterpolate($data.memo.title === "" ? "(\uC81C\uBAA9 \uC5C6\uC74C)" : $data.memo.title)}</div><div class="memo-date" data-v-298f16c0>${ssrInterpolate(_ctx.$dayjs($data.memo.create_date).format("YYYY.MM.DD"))}</div><div class="memo-contents" data-v-298f16c0>${ssrInterpolate($data.memo.content)}</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/memo/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-298f16c0"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-65f3ef3e.mjs.map
