<template>
    <div class="viewport">
        <!-- 채팅 헤더 -->
        <div class="header">
            <v-icon class="ic_home" @click="this.$router.push(`/home`)" />
            <v-icon class="logo_docent" />
        </div>

        <!-- <div class="chat-container" id="chat-scrollable" ref="chatContainer"> -->
        <slot />
        <!-- </div> -->

        <chat-input />
        <!-- TODO: 키보드 테스트 용 -->
        <!-- <div style="width: 100%; height: 300px"></div> -->
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

// .chat-container {
//     width: 100%;
//     height: calc(100% - (60px + 7rem)); // top + bottom
//     overflow-y: auto;
//     margin-top: 60px;
//     padding: 2rem;
//     overscroll-behavior: none;
// }
</style>
