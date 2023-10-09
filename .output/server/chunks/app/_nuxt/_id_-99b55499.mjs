import { u as useDiaryService } from './diary-67271a1a.mjs';
import { useSSRContext, defineComponent, ref, computed, nextTick, resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode } from 'vue';
import { ssrRenderTeleport, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrRenderSlot, ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import Hammer from 'hammerjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BottonSheet",
  __ssrInlineRender: true,
  props: {
    overlay: { type: Boolean, default: true },
    overlayColor: { default: "#0000004D" },
    maxWidth: { default: 640 },
    maxHeight: {},
    transitionDuration: { default: 0.5 },
    overlayClickClose: { type: Boolean, default: true },
    canSwipe: { type: Boolean, default: true }
  },
  emits: ["opened", "closed", "dragging-up", "dragging-down"],
  setup(__props, { expose: __expose, emit }) {
    const props = __props;
    const showSheet = ref(false);
    const sheetHeight = ref(0);
    const translateValue = ref(100);
    const isDragging = ref(false);
    const contentScroll = ref(0);
    const bottomSheet = ref(null);
    const bottomSheetHeader = ref(null);
    const bottomSheetMain = ref(null);
    const bottomSheetFooter = ref(null);
    ref(null);
    const bottomSheetDraggableArea = ref(null);
    const isFocused = (element) => document.activeElement === element;
    window.addEventListener("keyup", (event) => {
      const isSheetElementFocused = bottomSheet.value.contains(event.target) && isFocused(event.target);
      if (event.key === "Escape" && !isSheetElementFocused) {
        close();
      }
    });
    const sheetContentClasses = computed(() => {
      return [
        "bottom-sheet__content",
        {
          "bottom-sheet__content--fullscreen": sheetHeight.value >= window.innerHeight,
          "bottom-sheet__content--dragging": isDragging.value
        }
      ];
    });
    const transitionDurationString = computed(() => {
      return `${props.transitionDuration}s`;
    });
    const sheetHeightString = computed(() => {
      return "90%";
    });
    const maxHeightString = computed(() => {
      return "100%";
    });
    const translateValueString = computed(() => {
      return `${translateValue.value}%`;
    });
    const maxWidthString = computed(() => {
      return `${props.maxWidth}px`;
    });
    const initHeight = async () => {
      await nextTick();
      sheetHeight.value = bottomSheetHeader.value.offsetHeight + bottomSheetMain.value.clientHeight + bottomSheetFooter.value.offsetHeight;
    };
    const dragHandler = (event, type) => {
      if (props.canSwipe) {
        isDragging.value = true;
        const preventDefault = (e) => {
          e.preventDefault();
        };
        if (event.deltaY > 0) {
          if (type === "main" && event.type === "panup") {
            translateValue.value = pixelToVh(event.deltaY);
            if (event.cancelable) {
              bottomSheetMain.value.addEventListener(
                "touchmove",
                preventDefault
              );
            }
          }
          if (type === "main" && event.type === "pandown" && contentScroll.value === 0) {
            translateValue.value = pixelToVh(event.deltaY);
          }
          if (type === "area") {
            translateValue.value = pixelToVh(event.deltaY);
          }
          if (event.type === "panup") {
            emit("dragging-up");
          }
          if (event.type === "pandown") {
            emit("dragging-down");
          }
        }
        if (event.isFinal) {
          bottomSheetMain.value.removeEventListener(
            "touchmove",
            preventDefault
          );
          if (type === "main") {
            contentScroll.value = bottomSheetMain.value.scrollTop;
          }
          isDragging.value = false;
          if (translateValue.value >= 10) {
            close();
          } else {
            translateValue.value = 0;
          }
        }
      }
    };
    nextTick(() => {
      initHeight();
      const hammerAreaInstance = new Hammer(bottomSheetDraggableArea.value, {
        inputClass: Hammer.TouchMouseInput,
        recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }]]
      });
      const hammerMainInstance = new Hammer(bottomSheetMain.value, {
        inputClass: Hammer.TouchMouseInput,
        recognizers: [[Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }]]
      });
      hammerAreaInstance.on("panstart panup pandown panend", (e) => {
        dragHandler(e, "area");
      });
      hammerMainInstance.on("panstart panup pandown panend", (e) => {
        dragHandler(e, "main");
      });
    });
    const open = () => {
      translateValue.value = 0;
      document.documentElement.style.overflowY = "hidden";
      document.documentElement.style.overscrollBehavior = "none";
      showSheet.value = true;
      emit("opened");
    };
    const close = async () => {
      showSheet.value = false;
      translateValue.value = 100;
      setTimeout(() => {
        document.documentElement.style.overflowY = "auto";
        document.documentElement.style.overscrollBehavior = "";
        emit("closed");
      }, props.transitionDuration * 1e3);
    };
    const pixelToVh = (pixel) => {
      const height = props.maxHeight && props.maxHeight <= sheetHeight.value ? props.maxHeight : sheetHeight.value;
      return pixel / height * 100;
    };
    __expose({ open, close });
    return (_ctx, _push, _parent, _attrs) => {
      ({ style: {
        "--52199a60": transitionDurationString.value,
        "--044fc817": props.overlayColor,
        "--719a3ecc": translateValueString.value,
        "--5c6556f1": sheetHeightString.value,
        "--69fd0fd9": maxWidthString.value,
        "--33c62414": maxHeightString.value
      } });
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div class="bottom-sheet"${ssrRenderAttr("aria-hidden", !showSheet.value)} role="dialog" data-v-0f621373><div class="bottom-sheet__overlay" style="${ssrRenderStyle(_ctx.overlay && showSheet.value ? null : { display: "none" })}" data-v-0f621373></div><div class="${ssrRenderClass(sheetContentClasses.value)}" data-v-0f621373><header class="bottom-sheet__header" data-v-0f621373><div class="bottom-sheet__draggable-area" data-v-0f621373><div class="bottom-sheet__draggable-thumb" data-v-0f621373></div></div>`);
        ssrRenderSlot(_ctx.$slots, "header", {}, null, _push2, _parent);
        _push2(`</header><main class="bottom-sheet__main" data-v-0f621373>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
        _push2(`</main><footer class="bottom-sheet__footer" data-v-0f621373>`);
        ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent);
        _push2(`</footer></div></div>`);
      }, "body", false, _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BottonSheet.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const BottomSheet = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-0f621373"]]);
const _sfc_main = {
  name: "Diary",
  components: {
    BottomSheet
  },
  setup() {
    const myBottomSheet = ref(null);
    return {
      myBottomSheet
    };
  },
  data() {
    return {
      diary: {},
      type: "1"
    };
  },
  async mounted() {
    const { getMorningdiary, getNightdiary } = useDiaryService();
    const id = this.$route.params.id;
    const type = this.$route.query.type;
    this.type = type;
    console.log("id", id);
    console.log("type", type);
    console.log("type2", this.type);
    const res = type === "1" ? await getMorningdiary(id) : await getNightdiary(id);
    console.log(res);
    this.diary = res.data.diary;
  },
  computed: {
    dynamicBackgrond() {
      let background_color = `rgb(0, 0, 0)`;
      if (this.diary.background_color) {
        const colorList = JSON.parse(this.diary.background_color);
        console.log(colorList);
        if (colorList.length > 1) {
          background_color = `linear-gradient(rgb${colorList[0]}, rgb${colorList[1]})`;
        } else {
          background_color = `rgb${colorList[0]}`;
        }
      }
      console.log(">>> ", background_color);
      return {
        background: background_color
      };
    }
  },
  methods: {
    open() {
      this.$refs.myBottomSheet.open();
    },
    close() {
      this.$refs.myBottomSheet.close();
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_v_icon = resolveComponent("v-icon");
  const _component_bottom_sheet = resolveComponent("bottom-sheet");
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "viewport",
    style: $options.dynamicBackgrond
  }, _attrs))} data-v-85894074>`);
  _push(ssrRenderComponent(_component_v_icon, {
    class: "ic_close",
    onClick: ($event) => this.$router.back()
  }, null, _parent));
  _push(`<img class="image"${ssrRenderAttr("src", $data.diary.image_url)} data-v-85894074><div class="diary-title-box" data-v-85894074><div class="diary-title" data-v-85894074>${ssrInterpolate($data.diary.diary_name)}</div><div class="diary-date" data-v-85894074>${ssrInterpolate(_ctx.$dayjs($data.diary.create_date).format("YYYY.MM.DD"))}</div></div>`);
  _push(ssrRenderComponent(_component_bottom_sheet, {
    ref: "myBottomSheet",
    overlay: true
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="diary-bottom" data-v-85894074${_scopeId}><div class="diary-title" data-v-85894074${_scopeId}>${ssrInterpolate($data.diary.diary_name)}</div><div class="diary-date" data-v-85894074${_scopeId}>${ssrInterpolate(_ctx.$dayjs($data.diary.create_date).format("YYYY.MM.DD"))}</div><div class="diary-tags" data-v-85894074${_scopeId}></div><div class="diary-subtitle" data-v-85894074${_scopeId}>Artist Note</div><div class="diary-content" data-v-85894074${_scopeId}>${ssrInterpolate($data.diary.content)}</div>`);
        if ($data.type === "1") {
          _push2(`<div data-v-85894074${_scopeId}><hr data-v-85894074${_scopeId}><div class="diary-subtitle" data-v-85894074${_scopeId}>Detail</div><div class="diary-content" data-v-85894074${_scopeId}>${ssrInterpolate($data.diary.resolution)}</div></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div>`);
      } else {
        return [
          createVNode("div", { class: "diary-bottom" }, [
            createVNode("div", { class: "diary-title" }, toDisplayString($data.diary.diary_name), 1),
            createVNode("div", { class: "diary-date" }, toDisplayString(_ctx.$dayjs($data.diary.create_date).format("YYYY.MM.DD")), 1),
            createVNode("div", { class: "diary-tags" }),
            createVNode("div", { class: "diary-subtitle" }, "Artist Note"),
            createVNode("div", { class: "diary-content" }, toDisplayString($data.diary.content), 1),
            $data.type === "1" ? (openBlock(), createBlock("div", { key: 0 }, [
              createVNode("hr"),
              createVNode("div", { class: "diary-subtitle" }, "Detail"),
              createVNode("div", { class: "diary-content" }, toDisplayString($data.diary.resolution), 1)
            ])) : createCommentVNode("", true)
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/diary/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-85894074"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-99b55499.mjs.map
