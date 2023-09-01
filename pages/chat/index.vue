<template>
    <infinite-loading
        v-if="chatList?.length"
        :first-load="false"
        :distance="1000"
        direction="top"
        @infinite="loadMore"
    />
    <div v-for="chat in chatList" :key="chat.id">
        <chat-box v-if="chat.content_type === 5" type="docent" />
        <chat-box v-if="chat.content_type === 7" type="loading" />
        <chat-box
            v-if="chat.content_type === 6"
            :text="chat.content"
            type="date"
        />
        <chat-result
            v-if="chat.is_chatbot && [1, 2, 3, 4].includes(chat.content_type)"
            :type="chat.content_type"
            :chat="chat"
        />
        <chat-box
            v-if="
                !chat.is_chatbot &&
                [1, 2, 3, 4, null].includes(chat.content_type)
            "
            :text="chat.content"
        />
    </div>
</template>

<script>
import InfiniteLoading from "v3-infinite-loading";
import ChatBox from "../../components/chat/ChatBox.vue";
import ChatResult from "../../components/chat/ChatBox.vue";

import { mapState, mapActions } from "pinia";
import { useChatStore } from "../../store/chat";

export default {
    name: "Chat",
    components: { InfiniteLoading, ChatBox, ChatResult },
    setup() {
        definePageMeta({
            layout: "chat",
        });
    },
    computed: {
        ...mapState(useChatStore, [
            "list",
            "chatList",
            "totalCounts",
            "pageNo",
        ]),
    },
    watch: {
        list() {
            this.listToChatList();
        },
    },
    mounted() {
        window.localStorage.setItem(
            "accessToken",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjIwNTM1NDcxNzZ9.Dqf6UOvR-OlKY6cVMjoN0AJ25stW8ojdSy2GZ5dyHlc"
        );

        this.getList();
    },
    methods: {
        ...mapActions(useChatStore, ["getList", "listToChatList"]),
        // Infinite Loading
        async loadMore() {
            if (this.totalCounts > this.list.length) {
                this.getList();
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
