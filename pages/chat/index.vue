<template>
    <infinite-loading
        v-if="chatList.length"
        :first-load="false"
        :distance="1000"
        @infinite="loadMore"
    />
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
import InfiniteLoading from "v3-infinite-loading";
import { useChatService } from "../../services/chat";
const { getChatList } = useChatService();

definePageMeta({
    layout: "chat",
});

const totalCounts = ref(0);
const pageNo = ref(1);
const chatList = ref([]);
onMounted(async () => {
    // TODO: 테스트용 액세스 토큰 제거
    window.localStorage.setItem(
        "accessToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjIwNTM1NDcxNzZ9.Dqf6UOvR-OlKY6cVMjoN0AJ25stW8ojdSy2GZ5dyHlc"
    );
    addChatList();
});

// Infinite Loading
const loadMore = async () => {
    if (totalCounts.value > chatList.value.length) {
        addChatList();
    }
};

async function addChatList() {
    console.log(`✨addChatList(${pageNo.value})`);
    console.log(">>" + chatList.value.length + "/" + totalCounts.value);
    const res = await getChatList(pageNo.value);
    chatList.value = [...res.data.list.reverse(), ...chatList.value];
    totalCounts.value = res.data.total_counts;
    pageNo.value = res.data.page_num + 1;
    console.log(">>> ", chatList.value);
}
</script>

<style lang="scss" scoped></style>
