import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { useSSRContext, resolveComponent, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { m as mapState, b as mapActions, _ as _export_sfc } from '../server.mjs';
import InfiniteLoading from 'v3-infinite-loading';
import { u as useChatStore } from './chat-9b099d3c.mjs';
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
import './generate-2edefba2.mjs';

const loadingGIF = "" + buildAssetsURL("loading-dot.093b62ac.gif");
const _sfc_main$2 = {
  __name: "ChatBox",
  __ssrInlineRender: true,
  props: {
    type: { type: String, required: false, default: "text" },
    text: { type: String, required: false, default: "" }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_icon = resolveComponent("v-icon");
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["chat-box-wrapper", { right: __props.type === "text" }]
      }, _attrs))} data-v-5f072096>`);
      if (__props.type === "docent") {
        _push(`<div class="chat-profile" data-v-5f072096>`);
        _push(ssrRenderComponent(_component_v_icon, { class: "ic_docent" }, null, _parent));
        _push(`<div data-v-5f072096>\uB3C4\uC2A8\uD2B8</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.type === "date") {
        _push(`<div class="chat-date" data-v-5f072096>${ssrInterpolate(_ctx.$dayjs(__props.text).format("YYYY\uB144 M\uC6D4 D\uC77C"))}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.type === "loading") {
        _push(`<div class="chat-box loading" data-v-5f072096><img${ssrRenderAttr("src", unref(loadingGIF))} data-v-5f072096></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.type === "text") {
        _push(`<div class="chat-box" data-v-5f072096>${ssrInterpolate(__props.text)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat/ChatBox.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-5f072096"]]);
const _sfc_main$1 = {
  name: "ChatResult",
  props: {
    type: {
      type: Number,
      required: true,
      default: 1
    },
    chat: {
      type: Object,
      required: true,
      default: () => {
      }
    }
  },
  computed: {
    type_name() {
      switch (this.type) {
        case 1:
          return "\u{1F31E} \uC544\uCE68 \uC77C\uAE30";
        case 2:
          return "\u{1F319} \uC800\uB141 \uC77C\uAE30";
        case 3:
          return "\u270F\uFE0F \uBA54\uBAA8";
        default:
          return "\u2705 \uC77C\uC815";
      }
    }
  },
  methods: {
    more() {
      switch (this.chat.content_type) {
        case 1:
        case 2:
          const id = this.chat.content_type === 1 ? this.chat.MorningDiary_id : this.chat.NightDiary_id;
          this.$router.push(
            `/diary/${id}?type=${this.chat.content_type}`
          );
          break;
        case 3:
          this.$router.push(`/memo/${this.chat.Memo_id}`);
          break;
        case 4:
          this.$router.push(
            `/calendar/?date=${this.chat.event_time}`
          );
          break;
        default:
          alert("\u{1F514} \uC11C\uBE44\uC2A4 \uC624\uD508 \uC608\uC815\uC785\uB2C8\uB2E4.");
          break;
      }
      console.log("cliclk>>", this.chat);
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-result" }, _attrs))} data-v-f296ff25>`);
  if ($props.type === 4) {
    _push(`<div class="chat-title" data-v-f296ff25><span data-v-f296ff25>${ssrInterpolate($options.type_name.replace(" ", "\xA0\xA0"))}</span>\uC774 \uCD94\uAC00 \uB418\uC5C8\uC2B5\uB2C8\uB2E4! </div>`);
  } else {
    _push(`<div class="chat-title" data-v-f296ff25><span data-v-f296ff25>${ssrInterpolate($options.type_name.replace(" ", "\xA0\xA0"))}</span>\uAC00 \uCD94\uAC00 \uB418\uC5C8\uC2B5\uB2C8\uB2E4! </div>`);
  }
  if ($props.type === 1 || $props.type === 2) {
    _push(`<div class="memo" data-v-f296ff25><div class="chat-diary-title" data-v-f296ff25>${ssrInterpolate($props.chat.content)}</div><img${ssrRenderAttr("src", $props.chat.image_url)} data-v-f296ff25><div class="chat-more" data-v-f296ff25>\uB354 \uC54C\uC544\uBCF4\uAE30 &gt;</div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.type === 3) {
    _push(`<div data-v-f296ff25><div class="chat-memo" data-v-f296ff25>${ssrInterpolate($props.chat.content)} <div class="chat-more" data-v-f296ff25>\uB354 \uC54C\uC544\uBCF4\uAE30 &gt;</div></div></div>`);
  } else {
    _push(`<!---->`);
  }
  if ($props.type === 4) {
    _push(`<div data-v-f296ff25><div class="chat-calendar" data-v-f296ff25><div class="chat-calendar-title" data-v-f296ff25>${ssrInterpolate($props.chat.content)}</div><div class="date" data-v-f296ff25>${ssrInterpolate(_ctx.$dayjs($props.chat.event_time).format("MM.DD ddd"))}\uC694\uC77C </div></div><button class="button" data-v-f296ff25>\uC790\uC138\uD788 \uBCF4\uAE30</button></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat/ChatResult.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-f296ff25"]]);
const _sfc_main = {
  name: "Chat",
  components: { InfiniteLoading, ChatBox: __nuxt_component_0, ChatResult: __nuxt_component_0 },
  setup() {
  },
  data() {
    return {
      isInitialized: false
    };
  },
  computed: {
    ...mapState(useChatStore, [
      "list",
      "chatList",
      "totalCounts",
      "pageNo",
      "reload"
      // "isFirstPage",
    ])
  },
  watch: {
    list() {
      this.listToChatList();
    },
    reload() {
      if (this.reload) {
        const scrollRef = this.$refs.scrollable;
        const targetOffset = scrollRef.scrollHeight;
        scrollRef.scrollTo({
          top: targetOffset,
          behavior: "smooth"
        });
        scrollRef.addEventListener("scroll", () => {
          const check = scrollRef.scrollTop + scrollRef.clientHeight >= targetOffset - 0.5;
          if (check) {
            this.setReload(false);
          }
        });
      }
    }
  },
  mounted() {
    if (!window.localStorage.getItem("accessToken")) {
      this.$eventBus.$emit("onLoginModal");
      return;
    }
    this.getFirstPage();
  },
  methods: {
    ...mapActions(useChatStore, [
      "getList",
      "listToChatList",
      "getFirstPage",
      "setIsFirstPage",
      "setReload"
    ]),
    // Infinite Loading
    async loadMore() {
      this.$nextTick();
      setTimeout(() => {
        if (this.totalCounts > this.list.length) {
          this.getList();
        }
      }, 1e3);
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a;
  const _component_infinite_loading = resolveComponent("infinite-loading");
  const _component_chat_box = __nuxt_component_0;
  const _component_chat_result = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "contents",
    ref: "scrollable"
  }, _attrs))} data-v-95507045>`);
  if ((_a = _ctx.chatList) == null ? void 0 : _a.length) {
    _push(ssrRenderComponent(_component_infinite_loading, {
      "first-load": false,
      distance: 1e3,
      top: true,
      onInfinite: $options.loadMore
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<!--[-->`);
  ssrRenderList(_ctx.chatList, (chat) => {
    _push(`<div data-v-95507045>`);
    if (chat.content_type === 5) {
      _push(ssrRenderComponent(_component_chat_box, { type: "docent" }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (chat.content_type === 7) {
      _push(ssrRenderComponent(_component_chat_box, { type: "loading" }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (chat.content_type === 6) {
      _push(ssrRenderComponent(_component_chat_box, {
        text: chat.content,
        type: "date"
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (chat.is_chatbot && [1, 2, 3, 4].includes(chat.content_type)) {
      _push(ssrRenderComponent(_component_chat_result, {
        type: chat.content_type,
        chat
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    if (!chat.is_chatbot && [1, 2, 3, 4, null].includes(chat.content_type)) {
      _push(ssrRenderComponent(_component_chat_box, {
        text: chat.content
      }, null, _parent));
    } else {
      _push(`<!---->`);
    }
    _push(`</div>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/chat/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-95507045"]]);

export { index as default };
//# sourceMappingURL=index-0272dd68.mjs.map
