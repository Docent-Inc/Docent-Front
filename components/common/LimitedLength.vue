<template>
    <div
        class="character-count"
        :class="{ warn: content.length > limitedContentLength }"
    >
        {{ characterCount }} / {{ limitedContentLength }} 자
    </div>
</template>
<script>
export default {
    props: {
        content: {
            type: String,
            required: true,
        },
        limitedContentLength: {
            type: Number,
            required: true,
        },
        diary: {
            type: Object,
            required: false,
        },
    },
    data() {
        return {
            characterCount: 0,
        };
    },
    computed: {
    },
    watch: {
        content(value) {
            if (value.length > this.limitedContentLength) {
                value = value.substring(0, this.limitedContentLength);
                this.$emit("update:content", value);
            }
            this.characterCount = value.length;
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.character-count {
    width: 100%;
    text-align: right;
    /* color: $vc-gray-500; */
    font-size: 0.8em;

    &.warn {
        color: $vc-red-500;
    }
}
</style>
