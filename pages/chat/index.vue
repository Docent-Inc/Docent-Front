<template>
    <div v-for="chat in chatList" :key="chat.id">
        <chat-box v-if="!chat.is_chatbot" :text="chat.content" />
        <chat-result
            v-if="chat.is_chatbot"
            :type="chat.content_type"
            :chat="chat"
        />
    </div>
</template>

<script setup>
import { useChatService } from "../../services/chat";
const { getChatList } = useChatService();

definePageMeta({
    layout: "chat",
});

const chatList = ref([]);
onMounted(async () => {
    // TODO: 테스트용 액세스 토큰 제거
    window.localStorage.setItem(
        "accessToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjIwNTM1NDcxNzZ9.Dqf6UOvR-OlKY6cVMjoN0AJ25stW8ojdSy2GZ5dyHlc"
    );
    const res = await getChatList(1);
    chatList.value = res.data;
    console.log(res);
});
</script>

<style lang="scss" scoped></style>
