<template>
    <div class="viewport">
        <!-- 채팅 헤더 -->
        <div class="header">
            <v-icon class="ic_home" @click="this.$router.push(`/home`)" />

            <a class="tooltip" tabindex="0">
                <v-icon class="logo_docent" />
                <span class="tooltiptext tooltip-right">
                    <b>꿈. 일기. 메모. 일정.</b> <br />자유롭게 기록해 주시면
                    도슨트가 분류해요!</span
                >
            </a>
        </div>

        <div class="layout">
            <slot />
        </div>

        <chat-input />
    </div>
</template>

<script>
export default {
    mounted() {},
};
</script>
<style lang="scss" scoped>
.layout {
    height: calc(100% - (60px + 10rem));
    height: calc(
        100% -
            (
                60px + 10rem + constant(safe-area-inset-bottom) +
                    constant(safe-area-inset-top)
            )
    );
    height: calc(
        100% -
            (
                60px + 10rem + env(safe-area-inset-bottom) +
                    env(safe-area-inset-top)
            )
    );

    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));
}

.ic_home {
    font-size: 18px;
    position: absolute;
    left: 0;
    margin-left: 30px;
}

.logo_docent {
    font-size: 42px;
    margin: 0 auto;
}

// Tooltip - https://deeplify.dev/front-end/markup/tooltip
.tooltip {
    position: relative;
    display: block;
    margin: 0 auto;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 150px;
    background-color: rgba(238, 237, 244);
    color: #000;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    font-size: 12px;

    position: absolute;
    z-index: 1;

    b {
        font-family: "Pretendard Bold";
        color: var(--2C9577, #2c9577);
    }
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}

.tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    border-style: solid;
    border-width: 5px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
}

.tooltip .tooltip-right {
    top: 5;
    left: 110%;
}

.tooltip .tooltip-right::after {
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-color: transparent rgba(238, 237, 244, 0.45) transparent transparent;
}
</style>
