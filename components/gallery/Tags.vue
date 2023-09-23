<template>
    <div class="tags">
        <div
            class="tag"
            v-for="(tag, idx) in tags"
            :class="{ selected: idx === selected }"
            :key="idx"
            @click="onClick(idx)"
        >
            {{ tag }}
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
    data() {
        return {};
    },
    methods: {
        onClick(idx) {
            this.$emit("select", idx);
        },
    },
};
</script>

<style lang="scss" scoped>
.tags {
    display: flex;
    flex-direction: row;
}
.tag {
    border-radius: 1.5rem;
    border: 0.3px solid #000;
    padding: 0.375rem 0.5rem;
    color: #010101;
    text-align: center;
    font-family: "Pretendard";
    font-size: 14px;
    line-height: 21px; /* 150% */

    margin-right: 4px;

    &.selected {
        background: #2c9577;
        border: 0.3px solid #2c9577;
        color: #fff;
    }
}
</style>
