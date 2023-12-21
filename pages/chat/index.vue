<template>
    <div class="viewport">
        <div class="header">
            <span class="header-title"> Looi </span>
            <Icon class="ic_help" @click="isVisible = !isVisible" />
        </div>

        <div class="contents" ref="scrollableRef">
            <div class="chat-date">
                {{ $dayjs().format("YYYY년 M월 D일") }}
            </div>
            <ChatBox
                v-for="(chat, idx) in chatList"
                :key="idx"
                :chat="chat"
                class="chat-box"
            />
        </div>

        <Navigation />
        <ChatInput />

        <!-- 토스트 -->
        <Toast
            v-if="isVisible"
            @click="isVisible = false"
            text="꿈, 일기, 메모, 일정 등을 자유롭게 기록해 주시면 
            Looi가 분류하고 저장해요!"
            :top="60"
        />
    </div>
</template>

<script>
import Icon from "~/components/common/Icon.vue";
import ChatBox from "../../components/chat/ChatBox.vue";
import ChatResult from "../../components/chat/ChatBox.vue";
import ChatInput from "../../components/chat/ChatInput.vue";
import Toast from "../../components/common/Toast.vue";
import Navigation from "~/components/Navigation.vue";

export default {
    name: "Chat",
    components: { ChatBox, ChatResult, ChatInput, Toast, Navigation, Icon },
    setup() {
        // definePageMeta({
        //     layout: "main",
        // });
    },
};
</script>

<script setup>
import { watch } from "vue";

import { useChatStore } from "../../store/chat";
import { smoothScroll } from "@/utils/animation";
import { getHourType } from "@/utils/utils";

/**
 * Data
 */
const store = useChatStore();
const chatList = computed(() => store.chatList);
const resetFlag = computed(() => store.resetFlag);
const isGenerating = computed(() => store.isGenerating);
const isVisible = ref(false);
watch(
    () => store.chatList,
    async (newVal, oldVal) => {
        updateSessionChatList(newVal);
        updateCSS();
    },
    { deep: true },
);

watch(
    () => store.type,
    async (newVal, oldVal) => {
        store.addHelperChat(newVal);
    },
);

/**
 * LifeCycle
 */
onMounted(() => {
    getSessionChatList();
    updateCSS();
});

onUnmounted(() => {
    // 231216 - v2 디자인 변경으로 백버튼 없어짐에 따라 화면 나갈 때마다 초기화
    // if (resetFlag.value) {

    if (!isGenerating.value) {
        window.sessionStorage.removeItem("chatList");
        store.reset();
    }

    // }
});

/**
 * Methods
 */

async function getSessionChatList() {
    const chatList = window.sessionStorage.getItem("chatList");
    // console.log("Chat init! ", chatList);

    if (chatList) {
        store.initChatList(JSON.parse(chatList));
    } else {
        // Welcome Chat 추가
        const type = getHourType(new Date().getHours());
        store.addWelcomeChat(type);
    }
}

function updateSessionChatList(chatList) {
    const jsonChatList = JSON.stringify(chatList);
    window.sessionStorage.setItem("chatList", jsonChatList);
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
@import "@/assets/scss/variables.scss";

.header {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    background: rgba(255, 255, 255, 0.3);
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);
    border: none;
}

.contents {
    width: 100%;
    height: 100%;
    height: calc(100% - env(safe-area-inset-bottom));
    height: calc(100% - constant(safe-area-inset-bottom));

    padding: 0 2rem;
    background: $gradient_bg_light;
    padding-top: 60px; // header
    // input + CSS 52px 간격 요청 + nav
    padding-bottom: calc(12.5rem + 52px + 9rem);
    // IOS 네비 하단에 배경 X
    // margin-bottom: env(safe-area-inset-bottom);
    // margin-bottom: constant(safe-area-inset-bottom);

    display: flex;
    flex-direction: column;
    gap: 2rem;

    scroll-behavior: smooth;
    overflow-y: scroll;

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
        // margin: 0 auto;
        padding: 6px 42px;
    }
}
</style>
