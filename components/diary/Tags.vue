<template>
    <div class="tags">
        <div class="tag-buttons">
            <div
                v-for="(tag, idx) in tags"
                :key="idx"
                class="tag-area"
                :class="{ selected: idx === selected }"
                @click="onClick(idx)"
            >
                {{ tag.name }}
                <span v-if="tag.count !== null" class="count">{{
                    tag.count
                }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tags: {
            type: Array,
            required: true,
        },
        selected: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    methods: {
        onClick(idx) {
            this.$emit("select", idx);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.tags {
    position: relative;
    width: 100%;
    height: 43px;
    margin-top: 24px;
}

.tag-icon {
    width: 100%;
    height: 100%;
    background-position: center;
    position: relative;
    top: 0;
    left: 0;
}

.tag-buttons {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
}

.tag-area {
    flex: 1;
    height: 100%;
    cursor: pointer;
    color: $vc-gray-400;
    font-family: $font-default;
    display: flex;
    justify-content: center;
    align-items: center;
    &.selected {
        color: $vc-indigo-600;
        font-family: $font-medium;
        position: relative;

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            background: $vc-indigo-500;
            height: 4px;
            border-radius: 2px;
            width: 40%;
        }
    }

    .count {
        width: 24px;
        height: 24px;
        background: $vc-indigo-100;
        color: $vc-indigo-500;
        border-radius: $border-radius-default;
        font-size: 1.2rem;
        font-family: $font-bold;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 0.8rem;
    }
}
</style>
