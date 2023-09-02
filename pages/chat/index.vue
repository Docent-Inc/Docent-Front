<!-- TODO: 스크롤  -->
<template>
    <div id="chat-scrollable" ref="scrollable">
        <infinite-loading
            v-if="chatList?.length"
            :first-load="false"
            :distance="1000"
            :top="true"
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
                v-if="
                    chat.is_chatbot && [1, 2, 3, 4].includes(chat.content_type)
                "
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
    data() {
        return {
            isInitialized: false,
        };
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
        chatList() {
            // this.$nextTick();
            // if (!this.isInitialized) {
            //     const scrollRef = this.$refs.scrollable;
            //     scrollRef.scrollTo({
            //         top: scrollRef.scrollHeight,
            //         behavior: "smooth",
            //     });
            //     this.$nextTick();
            //     this.isInitialized = true;
            // }
        },
    },
    mounted() {
        this.getFirstPage();
        this.$eventBus.$emit("added");
    },
    created() {
        this.$eventBus.$on("added", () => {
            console.log("added!");
            this.$nextTick();
            // 아래 추가됐을 때만 아래로 스크롤
            this.scrollToBottom();
        });
    },
    methods: {
        ...mapActions(useChatStore, [
            "getList",
            "listToChatList",
            "getFirstPage",
        ]),
        // Infinite Loading
        async loadMore() {
            // this.$nextTick();
            // setTimeout(() => {
            //     if (this.totalCounts > this.list.length) {
            //         this.getList();
            //     }
            // }, 1000);
        },
        scrollToBottom() {
            const scrollRef = this.$refs.scrollable;
            scrollRef.scrollTo({
                top: scrollRef.scrollHeight,
                behavior: "smooth",
            });
            this.$nextTick();
            this.isInitialized = true;
        },
    },
};
</script>

<style lang="scss" scoped>
#chat-scrollable {
    width: 100%;
    height: calc(100% - (60px + 7rem)); // top + bottom
    overflow-y: scroll;
    margin-top: 60px;
    padding: 2rem;

    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
}
</style>
