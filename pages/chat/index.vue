<template>
    <div class="wrap">
        <div class="content">ello</div>
        <div class="chat">아래 채팅 바</div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "chat",
});
</script>

<style lang="scss" scoped>
.content {
    height: 100vh;
}
.chat {
    position: fixed;
    bottom: 0;
}
</style>
