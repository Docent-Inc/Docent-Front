<template>
    <div class="tags">
        <!-- 현재 선택된 태그에 따라 달라지는 배경 이미지 -->
        <v-icon :class="dynamicIconClass" class="tag-icon" />

        <!-- 투명한 버튼들 -->
        <div class="tag-buttons">
            <div
                v-for="(tag, idx) in tags"
                :key="idx"
                class="tag-area"
                @click="onClick(idx)"
            ></div>
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
    computed: {
        dynamicIconClass() {
            const icons = [
                "ic_tag_total",
                "ic_tag_dream",
                "ic_tag_diary",
                "ic_tag_memo",
            ];
            return icons[this.selected];
        },
    },
    methods: {
        onClick(idx) {
            this.$emit("select", idx);
        },
    },
};
</script>

<style scoped>
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
}
</style>
