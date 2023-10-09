import { useSSRContext, resolveComponent, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { d as defineStore, m as mapState, b as mapActions, _ as _export_sfc } from '../server.mjs';
import { u as useDiaryService } from './diary-67271a1a.mjs';
import InfiniteLoading from 'v3-infinite-loading';
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

const _sfc_main$7 = {
  name: "ListDiary",
  props: {
    diary: {
      type: Object,
      required: true,
      default: () => {
      }
    }
  },
  methods: {
    showDetail() {
      console.log("cliclk>>", this.diary);
      console.log(`type: ${this.diary.diary_type} id: ${this.diary.id}`);
      this.$router.push(
        `/diary/${this.diary.id}?type=${this.diary.diary_type}`
      );
    }
  }
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "item_diary" }, _attrs))} data-v-2dd5e4bb><img${ssrRenderAttr("src", $props.diary.image_url)} data-v-2dd5e4bb><div class="diary_text" data-v-2dd5e4bb><div class="diary_title" data-v-2dd5e4bb>${ssrInterpolate($props.diary.diary_name)}</div><div class="diary_date" data-v-2dd5e4bb>${ssrInterpolate(_ctx.$dayjs($props.diary.create_date).format("YYYY.MM.DD"))}</div></div>`);
  if ($props.diary.content_type === 1) {
    _push(`<div class="dot" data-v-2dd5e4bb></div>`);
  } else {
    _push(`<div class="dot green" data-v-2dd5e4bb></div>`);
  }
  _push(`</div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/gallery/ListDiary.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const ListDiary = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7], ["__scopeId", "data-v-2dd5e4bb"]]);
const _sfc_main$6 = {
  name: "ListDiary",
  props: {
    memo: {
      type: Object,
      required: true,
      default: () => {
      }
    }
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "item_memo" }, _attrs))} data-v-ae3b5ae6><div class="memo_text" data-v-ae3b5ae6><div class="memo_title" data-v-ae3b5ae6>${ssrInterpolate($props.memo.diary_name === "" ? "(\uC81C\uBAA9 \uC5C6\uC74C)" : $props.memo.diary_name)}</div><div class="memo_date" data-v-ae3b5ae6>${ssrInterpolate(_ctx.$dayjs($props.memo.create_date).format("YYYY.MM.DD"))}</div></div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/gallery/ListMemo.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ListMemo = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-ae3b5ae6"]]);
const _sfc_main$5 = {
  name: "ListItems",
  components: { ListDiary, ListMemo },
  props: {
    list: {
      type: Array,
      required: true,
      default: []
    }
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ListMemo = resolveComponent("ListMemo");
  const _component_ListDiary = resolveComponent("ListDiary");
  _push(`<!--[-->`);
  ssrRenderList($props.list, (data, idx) => {
    _push(`<div>`);
    if (data.diary_type === 3) {
      _push(ssrRenderComponent(_component_ListMemo, { memo: data }, null, _parent));
    } else {
      _push(ssrRenderComponent(_component_ListDiary, { diary: data }, null, _parent));
    }
    _push(`<hr></div>`);
  });
  _push(`<!--]-->`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/gallery/ListItems.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$4 = {
  name: "BoardMemo",
  props: {
    memo: {
      type: Object,
      required: true,
      default: () => {
      }
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "item_board_memo" }, _attrs))} data-v-8c88a107><div class="memo_text" data-v-8c88a107><div class="memo_date" data-v-8c88a107>${ssrInterpolate(_ctx.$dayjs($props.memo.create_date).format("YYYY.MM.DD"))}</div><div class="memo_title" data-v-8c88a107>${ssrInterpolate($props.memo.diary_name === "" ? "(\uC81C\uBAA9 \uC5C6\uC74C)" : $props.memo.diary_name)}</div><div class="memo_more" data-v-8c88a107> \uB354 \uC54C\uC544\uBCF4\uAE30 &gt; </div></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/gallery/BoardMemo.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const BoardMemo = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-8c88a107"]]);
const _sfc_main$3 = {
  name: "BoardDiary",
  props: {
    diary: {
      type: Object,
      required: true,
      default: () => {
      }
    }
  },
  methods: {
    showDetail() {
      console.log("cliclk>>", this.diary);
      console.log(
        `type: ${this.diary.content_type} id: ${this.diary.id}`
      );
      this.$router.push(
        `/diary/${this.diary.id}?type=${this.diary.content_type}`
      );
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "item_board_diary" }, _attrs))} data-v-687f6b6b><img${ssrRenderAttr("src", $props.diary.image_url)} data-v-687f6b6b></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/gallery/BoardDiary.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const BoardDiary = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-687f6b6b"]]);
const _sfc_main$2 = {
  name: "BoardItems",
  components: { BoardMemo, BoardDiary },
  props: {
    list: {
      type: Array,
      required: true,
      default: []
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_BoardMemo = resolveComponent("BoardMemo");
  const _component_BoardDiary = resolveComponent("BoardDiary");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "board-items" }, _attrs))} data-v-aef716a0><!--[-->`);
  ssrRenderList($props.list, (data, idx) => {
    _push(`<div class="item" data-v-aef716a0>`);
    if (data.diary_type === 3) {
      _push(ssrRenderComponent(_component_BoardMemo, { memo: data }, null, _parent));
    } else {
      _push(ssrRenderComponent(_component_BoardDiary, { diary: data }, null, _parent));
    }
    _push(`</div>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/gallery/BoardItems.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-aef716a0"]]);
const useGalleryStore = defineStore("gallery", {
  state: () => ({
    pageNo: 1,
    type: 0,
    // ALL (0), Dream (1), Diary(2), Memo(3)
    totalCounts: 0,
    mode: 0,
    // List (0), Board(1)
    list: [],
    data: {}
  }),
  actions: {
    async getGalleryList() {
      const { getGalleryList } = useDiaryService();
      console.log(`getGalleryList(${this.pageNo}/${this.type})`);
      const res = await getGalleryList(this.type, this.pageNo);
      console.log(res);
      if (!res.success) {
        const msg = `${res.status_code}  - ${res.message}`;
        console.log("Error! > ", msg, res);
        alert(msg);
        return;
      }
      this.list = res.data.list;
      this.totalCounts = res.data.count;
      this.pageNo += 1;
    },
    /**
     * Data를 조합하여 List로 변환하는 함수
     * 1) mergedList: 필요한 값만 합치기
     * 2) sortedList: created_date 기준 내림차 정렬
     */
    // dataToList() {
    //     let mergedList = [];
    //     if (this.type === 0) {
    //         mergedList = [
    //             ...this.data.MorningDiary!!.map((item) => ({
    //                 ...item,
    //                 content_type: 1,
    //             })),
    //             ...this.data.NightDiary!!.map((item) => ({
    //                 ...item,
    //                 content_type: 2,
    //             })),
    //             ...this.data.Memo!!.map((item) => ({
    //                 ...item,
    //                 content_type: 3,
    //             })),
    //         ];
    //     } else if (this.type === 1) {
    //         mergedList = [
    //             ...this.data.MorningDiary!!.map((item) => ({
    //                 ...item,
    //                 content_type: 1,
    //             })),
    //         ];
    //     } else if (this.type === 2) {
    //         mergedList = [
    //             ...this.data.NightDiary!!.map((item) => ({
    //                 ...item,
    //                 content_type: 2,
    //             })),
    //         ];
    //     } else {
    //         mergedList = [
    //             ...this.data.Memo!!.map((item) => ({
    //                 ...item,
    //                 content_type: 3,
    //             })),
    //         ];
    //     }
    //     mergedList = [...mergedList, ...this.list];
    //     const sortedList = mergedList.sort((a, b) =>
    //         b.create_date.localeCompare(a.create_date)
    //     );
    //     console.log(">> ", sortedList);
    //     this.list = sortedList;
    // },
    /**
     * TotalCounts 계산해 주는 함수
     * 각 타입에 따라 필요한 값만 저장
     */
    // computeTotalCounts() {
    //     if (this.type === 0)
    //         this.totalCounts =
    //             Number(this.data.Memo_count) +
    //             Number(this.data.MorningDiary_count) +
    //             Number(this.data!!.NightDiary_count);
    //     else if (this.type === 1)
    //         this.totalCounts = Number(this.data.MorningDiary_count);
    //     else if (this.type === 2)
    //         this.totalCounts = Number(this.data.NightDiary_count);
    //     else this.totalCounts = Number(this.data.Memo_count);
    // },
    setType(type) {
      this.type = type;
    },
    changeMode() {
      this.mode = (this.mode + 1) % 2;
    },
    reset() {
      this.pageNo = 1;
      this.totalCounts = 0;
      this.list = [];
      this.data = {};
    }
  }
});
const _sfc_main$1 = {
  props: {
    tags: {
      type: Array,
      required: true
    },
    selected: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    onClick(idx) {
      this.$emit("select", idx);
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "tags" }, _attrs))} data-v-4d93a3e7><!--[-->`);
  ssrRenderList($props.tags, (tag, idx) => {
    _push(`<div class="${ssrRenderClass([{ selected: idx === $props.selected }, "tag"])}" data-v-4d93a3e7>${ssrInterpolate(tag)}</div>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/gallery/Tags.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Tags = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-4d93a3e7"]]);
const _sfc_main = {
  name: "Gallery",
  setup() {
  },
  components: { ListDiary, ListMemo, InfiniteLoading, Tags },
  data() {
    return {};
  },
  watch: {
    type() {
      console.log("New type -> ", this.type);
      this.reset();
      this.getGalleryList();
    }
  },
  computed: {
    ...mapState(useGalleryStore, [
      "type",
      "mode",
      "list",
      "totalCounts",
      "data"
    ])
  },
  async mounted() {
    this.reset();
    await this.getGalleryList();
  },
  methods: {
    ...mapActions(useGalleryStore, [
      "setType",
      "changeMode",
      "getGalleryList",
      "reset"
    ]),
    loadMore() {
      if (this.list.length < this.totalCounts) {
        this.getGalleryList();
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  var _a;
  const _component_Tags = resolveComponent("Tags");
  const _component_v_icon = resolveComponent("v-icon");
  const _component_GalleryListItems = __nuxt_component_0;
  const _component_GalleryBoardItems = __nuxt_component_1;
  const _component_infinite_loading = resolveComponent("infinite-loading");
  _push(`<!--[--><div class="header" data-v-ebdfc750>`);
  _push(ssrRenderComponent(_component_Tags, {
    tags: ["ALL", "Dream", "Diary", "Memo"],
    onSelect: (idx) => _ctx.setType(idx),
    selected: _ctx.type
  }, null, _parent));
  _push(ssrRenderComponent(_component_v_icon, {
    class: _ctx.mode === 0 ? "ic_list" : "ic_board",
    onClick: ($event) => _ctx.changeMode()
  }, null, _parent));
  _push(`</div><div class="contents" data-v-ebdfc750>`);
  if (_ctx.mode === 0) {
    _push(ssrRenderComponent(_component_GalleryListItems, { list: _ctx.list }, null, _parent));
  } else {
    _push(ssrRenderComponent(_component_GalleryBoardItems, { list: _ctx.list }, null, _parent));
  }
  if ((_a = _ctx.list) == null ? void 0 : _a.length) {
    _push(ssrRenderComponent(_component_infinite_loading, {
      "first-load": false,
      distance: 1e3,
      top: true,
      onInfinite: $options.loadMore
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/gallery/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ebdfc750"]]);

export { index as default };
//# sourceMappingURL=index-674561f6.mjs.map
