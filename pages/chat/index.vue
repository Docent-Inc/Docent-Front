<template>
    <infinite-loading
        v-if="chatList.length"
        :first-load="false"
        :distance="1000"
        direction="top"
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

<script>
import InfiniteLoading from "v3-infinite-loading";
import ChatBox from "../../components/chat/ChatBox.vue";
import ChatResult from "../../components/chat/ChatBox.vue";

import { useChatService } from "../../services/chat";

export default {
    name: "Chat",
    components: { InfiniteLoading, ChatBox, ChatResult },
    setup() {
        definePageMeta({
            layout: "chat",
        });
    },
    data() {
        return {
            totalCounts: 0,
            pageNo: 1,
            chatList: [],
        };
    },
    mounted() {
        window.localStorage.setItem(
            "accessToken",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjIwNTM1NDcxNzZ9.Dqf6UOvR-OlKY6cVMjoN0AJ25stW8ojdSy2GZ5dyHlc"
        );

        this.addChatList();

        // var objDiv = document.getElementById("container");
        // objDiv.scrollTop = objDiv.scrollHeight;

        // const scrollContainer = this.$refs.container;
        // console.log(scrollContainer);
        // if (scrollContainer) {
        //     scrollContainer.scrollTop = scrollContainer.scrollHeight;
        // }
    },
    methods: {
        // Infinite Loading
        async loadMore() {
            if (this.totalCounts > this.chatList.length) {
                this.addChatList();
            }
        },

        async addChatList() {
            const { getChatList } = useChatService();

            console.log(`✨addChatList(${this.pageNo})`);
            console.log(">>" + this.chatList.length + "/" + this.totalCounts);
            const res = await getChatList(this.pageNo);
            this.chatList = [...res.data.list.reverse(), ...this.chatList];
            this.totalCounts = res.data.total_counts;
            this.pageNo = res.data.page_num + 1;
            console.log(">>> ", this.chatList);
        },
    },
};
</script>

<style lang="scss" scoped>
// #container {
//     width: 100%;
//     height: calc(100% - (60px + 7rem)); // top + bottom
//     overflow-y: auto;
//     margin-top: 60px;
//     padding: 2rem;
// }
</style>
