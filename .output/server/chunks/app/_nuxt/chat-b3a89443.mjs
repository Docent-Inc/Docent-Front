import { useSSRContext, resolveComponent, mergeProps, ref, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { m as mapState, b as mapActions, _ as _export_sfc } from '../server.mjs';
import { u as useGenerateService } from './generate-2edefba2.mjs';
import { u as useChatStore } from './chat-9b099d3c.mjs';
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

const _sfc_main$2 = {
  __name: "ChatVoice",
  __ssrInlineRender: true,
  emits: ["finish"],
  setup(__props, { emit }) {
    const data = ref("");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "ko";
    recognition.continuous = true;
    recognition.onresult = (e) => {
      for (let i = e.resultIndex, len = e.results.length; i < len; i++) {
        let transcript = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          data.value += transcript;
          console.log("\u{1F3A4} ", transcript);
        }
      }
    };
    function stop() {
      if (recognition)
        recognition.stop();
      emit("finish", data.value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_icon = resolveComponent("v-icon");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "chat-voice" }, _attrs))} data-v-37149285><div data-v-37149285>${ssrInterpolate(unref(data))}</div>`);
      _push(ssrRenderComponent(_component_v_icon, {
        class: "ic_voice big",
        onClick: stop
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat/ChatVoice.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-37149285"]]);
const _sfc_main$1 = {
  name: "ChatInput",
  data() {
    return {
      mode: "INPUT",
      // INPUT, VOICE
      data: "",
      isGenerating: false
    };
  },
  setup() {
  },
  computed: {
    ...mapState(useChatStore, ["chatList"])
  },
  methods: {
    ...mapActions(useChatStore, [
      "setChatList",
      "getFirstPage",
      "setReload"
    ]),
    async send() {
      if (!this.data || this.data === "") {
        alert("\uB0B4\uC6A9\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.");
        return;
      }
      if (this.isGenerating)
        return;
      const { generateChat } = useGenerateService();
      const list = this.chatList;
      list.push({ content_type: 7 });
      this.setChatList(list);
      this.isGenerating = true;
      const res = await generateChat(this.data);
      console.log("\u2728generateChat >>> ", this.data);
      if (!res.success) {
        const msg = `${res.status_code}  - ${res.message}`;
        console.log("Error! > ", msg, res);
        alert(msg);
      }
      this.data = "";
      this.getFirstPage();
      this.isGenerating = false;
    },
    setData(res) {
      this.data = res;
      this.mode = "INPUT";
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_v_icon = resolveComponent("v-icon");
  const _component_chat_voice = __nuxt_component_0$1;
  _push(`<!--[--><div class="chat-input" data-v-694c992e>`);
  if ($data.mode === "INPUT") {
    _push(ssrRenderComponent(_component_v_icon, {
      class: "ic_voice",
      onClick: ($event) => $data.mode = "VOICE"
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="input" data-v-694c992e><input type="text"${ssrRenderAttr("value", $data.data)} placeholder="\uB3C4\uC2A8\uD2B8\uC5D0\uAC8C \uB2F9\uC2E0\uC758 \uC774\uC57C\uAE30\uB97C \uB4E4\uB824\uC8FC\uC138\uC694"${ssrIncludeBooleanAttr($data.isGenerating) ? " disabled" : ""} data-v-694c992e>`);
  _push(ssrRenderComponent(_component_v_icon, {
    class: "ic_send",
    onClick: $options.send
  }, null, _parent));
  _push(`</div></div>`);
  if ($data.mode === "VOICE") {
    _push(ssrRenderComponent(_component_chat_voice, { onFinish: $options.setData }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/chat/ChatInput.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-694c992e"]]);
const _sfc_main = {
  mounted() {
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_v_icon = resolveComponent("v-icon");
  const _component_chat_input = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "viewport" }, _attrs))} data-v-c9e7c449><div class="header" data-v-c9e7c449>`);
  _push(ssrRenderComponent(_component_v_icon, {
    class: "ic_home",
    onClick: ($event) => this.$router.push(`/home`)
  }, null, _parent));
  _push(ssrRenderComponent(_component_v_icon, { class: "logo_docent" }, null, _parent));
  _push(`</div><div class="layout" data-v-c9e7c449>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
  _push(ssrRenderComponent(_component_chat_input, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/chat.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const chat = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-c9e7c449"]]);

export { chat as default };
//# sourceMappingURL=chat-b3a89443.mjs.map
