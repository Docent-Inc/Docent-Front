<template>
    <infinite-loading
        v-if="chatList.length"
        :first-load="false"
        :distance="1000"
        direction="top"
        @infinite="loadMore"
    />
    <div v-for="chat in chatList" :key="chat.id">
        <chat-box v-if="chat.content_type === 5" type="docent" />
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
            list: [],
        };
    },
    computed: {
        /**
         * 채팅 리스트 필터링
         * 1) 도슨트가 보낸 첫번째 메시지 위에는 프로필이 노출된다
         * 2) 날짜 일이 바뀌면 상단에 년/월/일이 표시된다
         */
        chatList() {
            const result = [];
            if (!this.list.length) return result;

            // 0) 가장 첫 채팅은 날짜 무조건 표시
            result.push({
                content_type: 6,
                content: this.list[0].create_date,
            });

            let isFirstChatbot = true;
            let prevCreateDate = null;

            for (const chat of this.list) {
                // 1) is_chatbot으로 시작하는 모든 채팅 중에서 가장 첫번째 채팅의 위에 도슨트 프로필(5) 추가
                if (chat.is_chatbot && isFirstChatbot) {
                    result.push({
                        content_type: 5,
                        is_chatbot: true,
                    });
                    isFirstChatbot = false;
                } else if (!chat.is_chatbot) {
                    isFirstChatbot = true;
                }

                // 2) create_date 기준으로 일이 바뀌는 시점의 채팅 위에 날짜(6) 데이터 추가
                if (
                    prevCreateDate &&
                    this.$dayjs(chat.create_date).format("YYYY/MM/DD") !==
                        this.$dayjs(prevCreateDate).format("YYYY/MM/DD")
                ) {
                    result.push({
                        content_type: 6,
                        content: chat.create_date,
                    });
                }

                result.push(chat);
                prevCreateDate = chat.create_date;
            }

            return result;
        },
    },
    mounted() {
        window.localStorage.setItem(
            "accessToken",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjIwNTM1NDcxNzZ9.Dqf6UOvR-OlKY6cVMjoN0AJ25stW8ojdSy2GZ5dyHlc"
        );

        this.addChatList();
    },
    methods: {
        // Infinite Loading
        async loadMore() {
            if (this.totalCounts > this.list.length) {
                this.addChatList();
            }
        },
        async addChatList() {
            const { getChatList } = useChatService();

            console.log(`✨addChatList(${this.pageNo})`);
            console.log(">>" + this.list.length + "/" + this.totalCounts);
            const res = await getChatList(this.pageNo);
            this.list = [...res.data.list.reverse(), ...this.list];
            this.totalCounts = res.data.total_counts;
            this.pageNo = res.data.page_num + 1;
            console.log(">>> ", this.list);
        },
    },
};
</script>

<style lang="scss" scoped></style>
