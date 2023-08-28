<template>
    <div class="wrap">
        <div class="viewport">
            <div>오늘 나의 마음 상태</div>
            <div class="chat" @click="router.push(`/chat`)">
                채팅
                <v-icon>mdi-send-circle</v-icon>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "main",
});
const router = useRouter();
</script>

<style lang="scss" scoped>
.viewport {
    justify-content: space-around;
}

.chat {
    width: 80%;
    margin: 0 auto;
    padding: 10px 0;
    border-radius: 40px;
    position: relative;

    text-align: center;
    background: #efefef;

    .v-icon {
        position: absolute;
        right: 0;
        margin-right: 15px;
    }
}
</style>
