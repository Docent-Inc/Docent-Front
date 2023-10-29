<template>
    <div class="contents" ref="scrollableRef" @click="push">
        <div class="chat-date">
            {{ $dayjs().format("YYYY년 M월 D일") }}
        </div>
        <chat-box
            v-for="(chat, idx) in chatList"
            :key="idx"
            :chat="chat"
            class="chat-box"
            @select="onSelect"
        />
    </div>
</template>

<script>
import ChatBox from "../../components/chat/ChatBox.vue";
import ChatResult from "../../components/chat/ChatBox.vue";

export default {
    name: "Chat",
    components: { ChatBox, ChatResult },
};
</script>

<script setup>
import { watch } from "vue";

import { useChatStore } from "../../store/chat";
import { smoothScroll } from "@/utils/animation";

definePageMeta({
    layout: "chat",
});

/**
 * Data
 */
const store = useChatStore();
const chatList = computed(() => store.chatList);
watch(
    () => store.chatList,
    async (newVal, oldVal) => {
        console.log(`chatList changed!`);
        console.log(newVal);

        updateSessionChatList(newVal);
        updateCSS();
    },
    { deep: true }
);

/**
 * LifeCycle
 */
onMounted(() => {
    getSessionChatList();
});

/**
 * Methods
 */

function getSessionChatList() {
    const chatList = window.sessionStorage.getItem("chatList");
    console.log("Chat init! ", chatList);

    if (chatList) {
        store.initChatList(JSON.parse(chatList));
    } else {
        // API & addChatList
        const testChat = {
            is_docent: true,
            type: "select",
            text: "유신님, 오늘 하루는 어땠어요? \n기록 예시가 필요한가요?",
            selectList: [
                "꿈을 기록하고 싶어요!",
                "일기를 기록하고 싶어요!",
                "메모를 하고 싶어요!",
                "일정을 입력하고 싶어요!",
            ],
        };

        store.addChat(testChat);
    }
}

function updateSessionChatList(chatList) {
    const jsonChatList = JSON.stringify(chatList);
    window.sessionStorage.setItem("chatList", jsonChatList);
}

function onSelect(idx) {
    const helperChatList = [
        "\“꽃밭에서 꽃을 꺾다가 벌한테 쏘이는 꿈을 꿨어요.\” 같이 입력하시면 좋아요!",
        "일기는 자신의 생각과 감정 위주로 적는 게 좋아요! 오늘 있었던 일에 대해 어떤 생각을 갖고 계신가요?",
        "해야할 일이나 기억하고 싶은 것을 간단하게 입력하세요!",
        "\“9월 18일 20시 김친구 생일\” 같이 날짜와 간단한 내용을 입력하시면 자동으로 일정에 등록해드릴게요!",
    ];

    const helperChat = {
        is_docent: true,
        type: "default",
        text: helperChatList[idx],
    };
    store.addChat(helperChat);
}

/**
 * Methods (CSS)
 */
async function updateCSS() {
    await nextTick();
    updateChatBoxCss();

    await new Promise((resolve) => setTimeout(resolve, 250));
    scrollToBottom();
}

const scrollableRef = ref(null);
const scrollToBottom = () => {
    if (!scrollableRef.value) return;
    smoothScroll(scrollableRef.value, scrollableRef.value.scrollHeight, 200);
};

const updateChatBoxCss = () => {
    const chatBoxEls = document.querySelectorAll(".chat-box");

    for (let i = 0; i < chatBoxEls.length - 1; i++) {
        const chatEl = chatBoxEls[i].querySelector(".chat-docent");
        const chatProEl = chatBoxEls[i].querySelector(".chat-docent-profile");

        if (!chatEl) continue;

        chatProEl.classList.add("chat-small");
    }

    return true;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/colors.scss";
.contents {
    width: 100%;
    height: 100%;

    overflow-y: scroll;
    padding: 2rem;

    // overscroll-behavior: contain;
    // -webkit-overflow-scrolling: touch;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    scroll-behavior: smooth;
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
    // margin: 2rem auto;
    margin: 0 auto;
    padding: 6px 42px;
}
</style>
