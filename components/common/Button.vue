<template>
    <div :class="class">
        <Icon :class="ic_class" />
    </div>
</template>

<script>
import Icon from "~/components/common/Icon.vue";

export default {
    name: "Button",
    components: { Icon },
    props: {
        class: {
            type: String,
            required: true,
        },
    },
    computed: {
        ic_class() {
            return this.class.replace("btn_", "ic_");
        },
    },
};
</script>
<style lang="scss" scoped>
div {
    cursor: pointer;
}
</style>
