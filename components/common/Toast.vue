<template>
    <!-- 토스트 -->
    <div
        class="toast animate__animated animate__bounceIn"
        :style="{ top: top, 'align-items': align }"
    >
        <span :class="{ bold: subText }">{{ text }}</span>
        <span v-if="subText">{{ subText }}</span>
        <Icon :class="'ic_x'" />
    </div>
</template>

<script>
import Icon from "~/components/common/Icon.vue";

export default {
    name: "Toast",
    components: { Icon },
    props: {
        top: {
            // top margin
            type: Number,
            required: true,
        },
        text: {
            // 내용
            type: String,
            required: true,
        },
        subText: {
            // 내용
            type: String,
            required: false,
        },
        align: {
            // 정렬 (default: flex-start)
            type: String,
            required: false,
            default: "flex-start",
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.toast {
    position: absolute;
    top: 70px;
    width: 90%;
    border-radius: 8px;
    background: $vc-gray-800;
    opacity: 0.9;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    color: #fff;
    font-size: 12px;

    padding: 8px 12px;

    span {
        max-width: calc(100% - (16px + 24px));
        white-space: pre-line;
    }
    .ic_x {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 16px;
    }
}

.animate__animated.animate__bounceIn {
    --animate-duration: 1s;
}

.bold {
    font-family: font-bold;
    font-size: 1.3rem;
}
</style>
