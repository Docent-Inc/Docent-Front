<template>
    <div class="viewport">
        <!-- 채팅 헤더 -->
        <div class="header">
            <v-icon class="ic_home" @click="this.$router.push(`/home`)" />
            <v-icon class="logo_docent" />
        </div>

        <slot />

        <chat-input />
    </div>
</template>

<script>
export default {
    mounted() {},
};
</script>
<style lang="scss" scoped>
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
