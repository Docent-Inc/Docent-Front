import { resolveComponent, useSSRContext } from 'vue';
import { m as mapState, e as useUserStore, _ as _export_sfc, A as API } from '../server.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
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

const useTodayService = () => {
  return {
    /**
     * 오늘 일정 조회
     */
    async getTodayCalendar() {
      const res = await API.get(`/today/calender`);
      return res.data;
    },
    /**
     * 오늘 기록 조회
     */
    async getTodayRecord() {
      const res = await API.get(`/today/record`);
      return res.data;
    },
    /**
     * 오늘 운세 조회
     */
    async getTodayLucky() {
      const res = await API.get(`/generate/luck`);
      return res.data;
    }
  };
};
const _sfc_main = {
  name: "Home",
  setup() {
  },
  computed: {
    ...mapState(useUserStore, ["user"])
  },
  data() {
    return {
      calendar: [],
      record: {},
      lucky: ""
    };
  },
  async mounted() {
    const { getTodayCalendar, getTodayRecord, getTodayLucky } = useTodayService();
    await getTodayCalendar().then((res) => {
      this.calendar = res.data;
    }).catch(() => {
    });
    await getTodayRecord().then((res) => {
      this.record = res.data;
    }).catch(() => {
    });
    await getTodayLucky().then((res) => {
      this.lucky = res.data.luck;
    }).catch(() => {
    });
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a, _b, _c;
  const _component_v_icon = resolveComponent("v-icon");
  _push(`<!--[--><div class="header" data-v-33720083>`);
  _push(ssrRenderComponent(_component_v_icon, { class: "logo_docent" }, null, _parent));
  _push(`</div><div class="contents" data-v-33720083><div class="title" data-v-33720083>${ssrInterpolate(_ctx.$dayjs().format("YYYY.MM.DD"))}</div><div class="main-title" data-v-33720083> \uC548\uB155\uD558\uC138\uC694 ${ssrInterpolate((_a = _ctx.user) == null ? void 0 : _a.nickname)}\uB2D8 <br data-v-33720083>\uC624\uB298\uC758 \uC774\uBCA4\uD2B8\uC608\uC694 </div><div class="main-calendar main-description" data-v-33720083>`);
  _push(ssrRenderComponent(_component_v_icon, { class: "ic_calendar" }, null, _parent));
  _push(` \xA0 `);
  if ($data.calendar.length > 0) {
    _push(`<div data-v-33720083>${ssrInterpolate($data.calendar[0].title)}\xA0\u25BA</div>`);
  } else {
    _push(`<div data-v-33720083>\uC77C\uC815\uC774 \uC5C6\uB124\uC694!</div>`);
  }
  _push(`</div><div class="main-title" data-v-33720083>\uC624\uB298\uC758 \uAE30\uB85D</div><div class="main-description" data-v-33720083> \uC624\uB298 ${ssrInterpolate((_b = _ctx.user) == null ? void 0 : _b.nickname)}\uB2D8\uC740 \uC774\uB7F0 \uADF8\uB9BC\uC744 \uADF8\uB9AC\uC168\uB124\uC694 </div><div class="main-slides" data-v-33720083>`);
  if ($data.record.morning) {
    _push(`<div class="main-slide" style="${ssrRenderStyle(`background-image: url(${$data.record.morning.image_url})`)}" data-v-33720083></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.record.night) {
    _push(`<div class="main-slide" style="${ssrRenderStyle(`background-image: url(${$data.record.night.image_url})`)}" data-v-33720083></div>`);
  } else {
    _push(`<!---->`);
  }
  if (!$data.record.morning && !$data.record.night) {
    _push(`<div class="main-slide empty" data-v-33720083>${ssrInterpolate((_c = _ctx.user) == null ? void 0 : _c.nickname)}\uB2D8\uC758 \uADF8\uB9BC\uC744 <br data-v-33720083>\uADF8\uB824\uC8FC\uC138\uC694! </div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><div class="main-title" data-v-33720083>\uC624\uB298\uC758 \uC6B4\uC138</div><div class="main-description" data-v-33720083>${ssrInterpolate($data.lucky)}</div></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/home/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-33720083"]]);

export { index as default };
//# sourceMappingURL=index-65183dd4.mjs.map
