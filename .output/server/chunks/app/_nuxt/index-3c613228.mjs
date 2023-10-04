import { mergeProps, useSSRContext, defineComponent, ref, createElementBlock } from 'vue';
import { d as defineStore, m as mapState, b as mapActions, _ as _export_sfc } from '../server.mjs';
import { u as useDiaryService } from './diary-67271a1a.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

const __nuxt_component_0 = /* @__PURE__ */ defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  // eslint-disable-next-line vue/require-prop-types
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const initialState = () => ({
  page: {
    year: (/* @__PURE__ */ new Date()).getFullYear(),
    month: (/* @__PURE__ */ new Date()).getMonth() + 1
  },
  date: {
    date: /* @__PURE__ */ new Date(),
    todos: null
  },
  attributes: [],
  list: [],
  todos: []
});
const useCalendarStore = defineStore("calendar", {
  state: initialState,
  actions: {
    /**
     * 현재 페이지 선택
     * (1) 페이지 세팅
     * (2) 해당 페이지(달)의 일정 목록 조회
     */
    setPage(date) {
      this.page.year = date.getFullYear();
      this.page.month = date.getMonth() + 1;
      this.getCalendarList();
    },
    /**
     * 하이라이트 할 날짜 선택
     * (1) 날짜, 페이지 세팅 & 해당 일자 하이라이트
     * (2) 해당 일자의 일정 목록 조회
     */
    setDate(date) {
      this.date.date = date;
      this.setPage(date);
      this.attributes = this.attributes.filter((e) => !e.highlight);
      this.attributes.push({
        key: date.getDate(),
        highlight: {
          color: "black",
          fillMode: "outline"
        },
        dates: date
      });
      this.getCalendar();
    },
    /**
     * 현재 페이지의 일정 attr로 세팅
     * (1) 하이라이트 제외 attr 초기화
     * (2) 해당하는 일자에 dot 추가
     */
    setAttributes() {
      this.attributes = this.attributes.filter((e) => e.highlight);
      this.list.forEach((cal) => {
        const dates = [];
        const start_time = new Date(cal.start_time);
        const end_time = new Date(cal.end_time);
        while (start_time <= end_time) {
          dates.push(new Date(start_time));
          start_time.setDate(start_time.getDate() + 1);
        }
        const attr = {
          key: cal.id,
          dot: "light-gray",
          dates
        };
        this.attributes.push(attr);
      });
    },
    async getCalendarList() {
      const { getCalendarList } = useDiaryService();
      const res = await getCalendarList(this.page.year, this.page.month);
      this.list = res.data;
      this.setAttributes();
    },
    async getCalendar() {
      const { getCalendar } = useDiaryService();
      const res = await getCalendar(
        this.date.date.getFullYear(),
        this.date.date.getMonth() + 1,
        this.date.date.getDate()
      );
      this.todos = res.data;
    },
    reset() {
      Object.assign(this.$state, initialState());
    }
  }
});
const _sfc_main = {
  name: "Calendar",
  setup() {
  },
  computed: {
    ...mapState(useCalendarStore, ["page", "date", "attributes", "todos"])
  },
  async mounted() {
    this.reset();
    let date = new Date(this.$route.query.date);
    if (!date || isNaN(date))
      date = /* @__PURE__ */ new Date();
    this.setDate(date);
  },
  methods: {
    ...mapActions(useCalendarStore, ["setDate", "setPage", "reset"])
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_client_only = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "contents" }, _attrs))} data-v-49c8bafb>`);
  _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
  _push(`<div class="bottom-sheet" data-v-49c8bafb><div class="calendar-title" data-v-49c8bafb>${ssrInterpolate(_ctx.$dayjs(_ctx.date.date).format("D. dd"))}</div>`);
  if (_ctx.todos && _ctx.todos.length > 0) {
    _push(`<div class="calendar-contents" data-v-49c8bafb><!--[-->`);
    ssrRenderList(_ctx.todos, (todo) => {
      _push(`<div class="calendar-content" data-v-49c8bafb><div class="circle" data-v-49c8bafb></div> ${ssrInterpolate(todo.diary_name)}</div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<div class="calendar-none" data-v-49c8bafb>\uC77C\uC815\uC774 \uC5C6\uC2B5\uB2C8\uB2E4</div>`);
  }
  _push(`</div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/calendar/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-49c8bafb"]]);

export { index as default };
//# sourceMappingURL=index-3c613228.mjs.map
