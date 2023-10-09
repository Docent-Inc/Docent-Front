import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';

const _sfc_main = {
  props: {
    options: {
      type: Array,
      required: true
    },
    default: {
      type: String,
      required: false,
      default: null
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      selected: this.default ? this.default : this.options.length > 0 ? this.options[0] : null,
      open: false
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "custom-select",
    tabindex: $props.tabindex
  }, _attrs))} data-v-8fdf319c>`);
  if (!$props.disabled) {
    _push(`<div class="${ssrRenderClass([{ open: $data.open, disabled: $props.disabled }, "selected"])}" data-v-8fdf319c>${ssrInterpolate($data.selected)}</div>`);
  } else {
    _push(`<div class="disabled" data-v-8fdf319c>${ssrInterpolate($data.selected)}</div>`);
  }
  _push(`<div class="${ssrRenderClass([{ selectHide: !$data.open }, "items"])}" data-v-8fdf319c><!--[-->`);
  ssrRenderList($props.options, (option, i) => {
    _push(`<div class="${ssrRenderClass([{ selected: $data.selected === option }, "item"])}" data-v-8fdf319c>${ssrInterpolate(option)}</div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SelectBox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-8fdf319c"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=SelectBox-58511d20.mjs.map
