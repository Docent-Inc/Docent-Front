<!-- TODO: 스크롤  -->
<template>
    <div class="contents" ref="scrollable">
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
            layout: "chat2",
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
            "reload",
            // "isFirstPage",
        ]),
    },
    watch: {
        list() {
            this.listToChatList();
        },
        reload() {
            // console.log(this.reload);
            // TODO: 스크롤 관련 처리
            if (this.reload) {
                // console.log("스크롤 실행!");
                const scrollRef = this.$refs.scrollable;
                const targetOffset = scrollRef.scrollHeight;
                // console.log("*", scrollRef.scrollTop, ", ", targetOffset);
                scrollRef.scrollTo({
                    top: targetOffset,
                    behavior: "smooth",
                });

                scrollRef.addEventListener("scroll", () => {
                    const check =
                        scrollRef.scrollTop + scrollRef.clientHeight >=
                        targetOffset - 0.5;

                    // console.log(
                    //     " check -> ",
                    //     scrollRef.scrollTop + scrollRef.clientHeight,
                    //     ", ",
                    //     targetOffset - 0.5
                    // );
                    if (check) {
                        this.setReload(false);
                    }
                });
            }
        },
    },
    mounted() {
        this.getFirstPage();
    },
    methods: {
        ...mapActions(useChatStore, [
            "getList",
            "listToChatList",
            "getFirstPage",
            "setIsFirstPage",
            "setReload",
        ]),
        // Infinite Loading
        async loadMore() {
            // console.log("here");
            // if (this.reload) return;
            this.$nextTick();
            setTimeout(() => {
                if (this.totalCounts > this.list.length) {
                    this.getList();
                }
            }, 1000);
        },
    },
};
</script>

<style lang="scss" scoped>
.contents {
    width: 100%;
    height: 100%;

    overflow-y: scroll;
    padding: 2rem;

    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
}
</style>
