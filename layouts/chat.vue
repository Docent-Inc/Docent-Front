<template>
    <div class="viewport">
        <!-- 채팅 헤더 -->
        <div class="header">
            <v-icon class="ic_home" @click="this.$router.push(`/home`)" />
            <v-icon class="logo_docent" />
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
    height: calc(100% - (60px + 7.5rem));
    height: calc(
        100% -
            (
                60px + 7.5rem + constant(safe-area-inset-bottom) +
                    constant(safe-area-inset-top)
            )
    );
    height: calc(
        100% -
            (
                60px + 7.5rem + env(safe-area-inset-bottom) +
                    env(safe-area-inset-top)
            )
    );

    // margin-top: 60px;
    // margin-top: calc(60px + constant(safe-area-inset-top));
    // margin-top: calc(60px + env(safe-area-inset-top));
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
</style>
