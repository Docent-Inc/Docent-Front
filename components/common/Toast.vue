<template>
    <!-- 토스트 -->
    <div class="toast" :style="{ top: top }">
        {{ text }}
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
    },
};
</script>
<style lang="scss" scoped>
.toast {
    position: absolute;
    top: 70px;
    width: 90%;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.7);

    display: flex;
    align-items: center;
    justify-content: start;
    color: #fff;
    font-size: 12px;
    white-space: pre-wrap;

    padding: 8px 12px;

    .ic_x {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 16px;
    }
}
</style>
