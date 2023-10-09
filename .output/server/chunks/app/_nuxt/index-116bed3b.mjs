import { b as buildAssetsURL } from '../../handlers/renderer.mjs';
import { useSSRContext, resolveComponent, mergeProps } from 'vue';
import { u as useGenerateService } from './generate-2edefba2.mjs';
import { ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
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

const IntrovertSVG = "" + buildAssetsURL("img_introvert.93fd09b8.svg");
const ExtrovertSVG = "" + buildAssetsURL("img_extrovert.4be0005f.svg");
const _sfc_main$1 = {
  name: "Statistics",
  props: {
    statistics: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      IMG: {
        IntrovertSVG,
        ExtrovertSVG
      }
    };
  },
  computed: {
    introvert() {
      if (!this.statistics)
        return 0;
      return this.statistics[0]["\uB0B4\uD5A5"];
    },
    extrovert() {
      if (!this.statistics)
        return 0;
      return this.statistics[0]["\uC678\uD5A5"];
    },
    style_introvert() {
      const first = `${parseInt(this.introvert / 10)}`;
      return `width: ${20 + 5 * (first - 1)}%;`;
    },
    style_extrovert() {
      const first = `${parseInt(this.extrovert / 10)}`;
      return `width: ${20 + 5 * (first - 1)}%;`;
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "report-stat" }, _attrs))} data-v-2b107d27><img${ssrRenderAttr("src", $data.IMG.IntrovertSVG)} id="introvert" style="${ssrRenderStyle($options.style_introvert)}" data-v-2b107d27><img${ssrRenderAttr("src", $data.IMG.ExtrovertSVG)} id="extrovert" style="${ssrRenderStyle($options.style_extrovert)}" data-v-2b107d27><div id="introvert_txt" data-v-2b107d27> \uB0B4\uD5A5 <br data-v-2b107d27> ${ssrInterpolate($options.introvert)} % </div><div id="extrovert_txt" data-v-2b107d27> \uC678\uD5A5 <br data-v-2b107d27> ${ssrInterpolate($options.extrovert)}% </div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/report/Statistics.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Statistics = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-2b107d27"]]);
const _sfc_main = {
  name: "Report",
  setup() {
  },
  components: { Statistics },
  data() {
    return {
      IMG: {
        IntrovertSVG,
        ExtrovertSVG
      },
      data: {
        create_date: "2023-08-29T14:36:18"
      },
      name: "",
      status: "LOADING"
      // LOADING, SUCCESS, NODATA
    };
  },
  async mounted() {
    if (!window.localStorage.getItem("accessToken")) {
      console.log(this.$eventBus);
      this.$eventBus.$emit("onLoginModal");
      return;
    }
    this.name = window.localStorage.getItem("name");
    const { getReport } = useGenerateService();
    await getReport().then((res) => {
      console.log(res);
      console.log(this.data);
      this.data = res.data;
      this.status = "SUCCESS";
    }).catch((e) => {
      if (e.status_code === 4019)
        this.status = "NODATA";
    });
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Statistics = resolveComponent("Statistics");
  const _component_v_progress_circular = resolveComponent("v-progress-circular");
  _push(`<!--[--><div class="contents" data-v-a90229eb><div class="title" data-v-a90229eb>${ssrInterpolate($data.name)} \uB2D8\uC758 \uAE4A\uC740 \uACF3\uC774\uC5D0\uC694</div>`);
  _push(ssrRenderComponent(_component_Statistics, {
    statistics: $data.data.statistics
  }, null, _parent));
  _push(`<div class="report-keyword" data-v-a90229eb><div data-v-a90229eb>Key Word</div><div data-v-a90229eb>${ssrInterpolate($data.data.statistics ? $data.data.statistics[1].join(", ") : "")}</div></div><div class="report-content" data-v-a90229eb><div class="report-title" data-v-a90229eb>Mental State</div><div class="report-desc" data-v-a90229eb>${ssrInterpolate($data.data.mental_state)}</div></div><div class="report-content" data-v-a90229eb><div class="report-title" data-v-a90229eb>\uC678\uD5A5\uC801 \uD65C\uB3D9</div><!--[-->`);
  ssrRenderList($data.data.extroverted_activities, (extro) => {
    _push(`<div class="report-desc" data-v-a90229eb> \u2022 ${ssrInterpolate(extro)}</div>`);
  });
  _push(`<!--]--></div><div class="report-content" data-v-a90229eb><div class="report-title" data-v-a90229eb>\uB0B4\uD5A5\uC801 \uD65C\uB3D9</div><!--[-->`);
  ssrRenderList($data.data.introverted_activities, (intro) => {
    _push(`<div class="report-desc" data-v-a90229eb> \u2022 ${ssrInterpolate(intro)}</div>`);
  });
  _push(`<!--]--></div><div class="report-content" data-v-a90229eb><div class="report-title" data-v-a90229eb>\uAE0D\uC815\uC801\uC778 \uBD80\uBD84 3\uAC1C</div><!--[-->`);
  ssrRenderList($data.data.positives, (positive) => {
    _push(`<div class="report-desc" data-v-a90229eb> \u2022 ${ssrInterpolate(positive)}</div>`);
  });
  _push(`<!--]--></div><div class="report-content" data-v-a90229eb><div class="report-title" data-v-a90229eb>\uBD80\uC815\uC801\uC778 \uBD80\uBD84 3\uAC1C</div><!--[-->`);
  ssrRenderList($data.data.negatives, (negative) => {
    _push(`<div class="report-desc" data-v-a90229eb> \u2022 ${ssrInterpolate(negative)}</div>`);
  });
  _push(`<!--]--></div><div class="report-content" data-v-a90229eb><div class="report-title" data-v-a90229eb>\uCD94\uCC9C</div><!--[-->`);
  ssrRenderList($data.data.recommendations, (recomendation) => {
    _push(`<div class="report-desc" data-v-a90229eb> \u2022 ${ssrInterpolate(recomendation)}</div>`);
  });
  _push(`<!--]--></div></div>`);
  if ($data.status === "LOADING") {
    _push(`<div class="blank" data-v-a90229eb>`);
    _push(ssrRenderComponent(_component_v_progress_circular, {
      indeterminate: "",
      color: "#2C9577"
    }, null, _parent));
    _push(`\uBCF4\uACE0\uC11C \uC0DD\uC131 \uC911. . . </div>`);
  } else {
    _push(`<!---->`);
  }
  if ($data.status === "NODATA") {
    _push(`<div class="blank" data-v-a90229eb> \uB9C8\uC74C \uBCF4\uACE0\uC11C\uB97C \uB9CC\uB4E4\uAE30 \uC704\uD55C <br data-v-a90229eb>\uAE30\uB85D\uC774 \uBD80\uC871\uD569\uB2C8\uB2E4 \u{1F62D} </div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/report/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-a90229eb"]]);

export { index as default };
//# sourceMappingURL=index-116bed3b.mjs.map
