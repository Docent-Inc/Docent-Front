<!-- TODO: 스크롤  -->
<template>
    <div class="contents" ref="scrollable">
        <!-- <infinite-loading
            v-if="chatList?.length"
            :first-load="false"
            :distance="1000"
            :top="true"
            @infinite="loadMore"
        /> -->
        <div class="chat-date">
            {{ $dayjs().format("YYYY년 M월 D일") }}
        </div>
        <div v-for="chat in dummyLists" :key="chat.id">
            <chat-box :chat="chat" />
        </div>
    </div>
</template>

<script>
import InfiniteLoading from "v3-infinite-loading";
import ChatBox from "../../components/chat/ChatBox.vue";
import ChatResult from "../../components/chat/ChatBox.vue";

import { mapState, mapActions } from "pinia";
import { useChatStore } from "../../store/chat2";

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
            dummyLists: [
                {
                    is_docent: true,
                    type: "select",
                    text: "유신님, 오늘 하루는 어땠어요? \n기록 예시가 필요한가요?",
                },
                {
                    is_docent: true,
                    type: "default",
                    text: "일기는 자신의 생각과 감정 위주로 적는 게 좋아요! 오늘 있었던 일에 대해 어떤 생각을 갖고 계신가요?",
                },
                {
                    is_docent: false,
                    text: "이대형 대표님의 강의에서 큰 깨달음을 얻었다. 창업을 하는 과정에서 팀원을 구하는 것에 어려움을 느껴 지쳐가고 있었던 나에게 지금 내가 새로운 팀원에게 제공할 수 있는 것을 깨닫게 되었고 다시 힘을 얻을 수 있었다.",
                },
                {
                    is_docent: true,
                    type: "loading",
                    text: "Lookie가 열심히 기록을 확인하고 있어요!",
                },
                {
                    is_docent: true,
                    type: "result",
                    result: {
                        id: 1,
                        content_type: 1,
                        content: {
                            diary_name: "하늘을 날아다니는 비둘기, 용의 꿈",
                            image_url:
                                "https://storage.googleapis.com/docent/60f99524-8392-4784-b267-e483654b6240.png",
                            resolution: "",
                            content: "",
                            create_date: "",
                        },
                    },
                },
                {
                    is_docent: false,
                    text: "이대형 대표님의 강의에서 큰 깨달음을 얻었다. 창업을 하는 과정에서 팀원을 구하는 것에 어려움을 느껴 지쳐가고 있었던 나에게 지금 내가 새로운 팀원에게 제공할 수 있는 것을 깨닫게 되었고 다시 힘을 얻을 수 있었다.",
                },
                {
                    is_docent: true,
                    type: "result",
                    result: {
                        id: 2,
                        content_type: 2,
                        content: {
                            diary_name:
                                "노을 아래 잠겨있는 비밀의 만남: 서핑하는 돌고래와의 꿈",
                            image_url:
                                "https://storage.googleapis.com/docent/16a046f7-0ee9-402b-aa51-aa15d6dab1a1.png",
                            content: "",
                            create_date: "",
                        },
                    },
                },
                {
                    is_docent: false,
                    text: "내일 수건, 충전기가 필요해.",
                },
                {
                    is_docent: true,
                    type: "result",
                    result: {
                        id: 3,
                        content_type: 3,
                        content: {
                            title: "내일 필요한 것",
                            content: "1. 수건 \n2. 충전기",
                        },
                    },
                },
                {
                    is_docent: false,
                    text: "내일 3시에 점심 약속이 있어.",
                },
                {
                    is_docent: true,
                    type: "result",
                    result: {
                        id: 3,
                        content_type: 4,
                        content: {
                            title: "점심 약속 와라랄라라라라ㅏ라라라ㄹ와로아라ㅗ라",
                            start_time: "2023-10-03T16:44:23",
                            end_time: "2023-10-03T16:44:23",
                        },
                    },
                },
            ],
        };
    },
    mounted() {
        // this.getFirstPage();
    },
    methods: {
        // Infinite Loading
        async loadMore() {
            // console.log("here");
            // if (this.reload) return;
            this.$nextTick();
            setTimeout(() => {
                // if (this.totalCounts > this.list.length) {
                //     this.getList();
                // }
            }, 1000);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/colors.scss";

.contents {
    width: 100%;
    height: 100%;

    overflow-y: scroll;
    padding: 2rem;

    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
}

.chat-date {
    width: fit-content;
    color: $vc-gray-500;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.6);

    text-align: center;
    font-family: "Pretendard";
    font-size: 12px;
    line-height: 160%;
    margin: 2rem auto;
    padding: 6px 42px;
}
</style>
