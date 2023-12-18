<template>
    <div
        class="character-count"
        :class="{ warn: content.length > limitedContentLength }"
        :style="dynamicInputBottom"
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
        dynamicInputBottom() {
            let text_color = "#fff";

            if (this.diary.background_color) {
                const colorList = JSON.parse(this.diary.background_color);

                if (colorList.length > 1) {
                    text_color = getTextColorForBackground([
                        `rgb${colorList[1]}`,
                    ]);
                } else {
                    text_color = getTextColorForBackground([
                        `rgb${colorList[0]}`,
                    ]);
                }
            }

            return {
                color: text_color,
            };
        },
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
