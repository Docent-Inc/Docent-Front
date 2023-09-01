<template>
    <div class="viewport">
        <!-- 채팅 헤더 -->
        <div class="header">
            <v-icon class="ic_home" />
            <v-icon class="logo_docent" />
        </div>

        <div class="contents" id="container" ref="chatContainer">
            <slot />
        </div>

        <chat-input />
    </div>
</template>

<script>
export default {
    mounted() {
        this.$nextTick(() => {
            console.log(this.$refs.chatContainer);
            var objDiv = document.getElementById("container");
            objDiv.scrollTop = objDiv.scrollHeight;
        });
    },
};
</script>
<style lang="scss" scoped>
.wrapper {
    width: 100%;
    padding-top: 60px;
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

.contents {
    width: 100%;
    height: calc(100% - (60px + 7rem)); // top + bottom
    overflow-y: auto;
    margin-top: 60px;
    padding: 2rem;
}
</style>
