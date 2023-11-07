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

        <!-- 토스트 -->
        <Toast
            v-if="isVisible"
            @close="isVisible = false"
            text="텍스트 생성 중입니다..."
            :top="60"
        />
    </div>
</template>

<script>
import ChatBox from "../../components/chat/ChatBox.vue";
import ChatResult from "../../components/chat/ChatBox.vue";
import Toast from "../../components/common/Toast.vue";

export default {
    name: "Chat",
    components: { ChatBox, ChatResult, Toast },
};
</script>

<script setup>
import { watch } from "vue";

import { useUserStore } from "../../store/user";
import { useChatStore } from "../../store/chat";
import { smoothScroll } from "@/utils/animation";
import { getHourType } from "@/utils/utils";

definePageMeta({
    layout: "chat",
});

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
    { deep: true }
);

/**
 * LifeCycle
 */
onMounted(() => {
    getSessionChatList();
    updateCSS();

    isVisible.value = false;
});

onUnmounted(() => {
    if (resetFlag.value) {
        window.sessionStorage.removeItem("chatList");
        store.reset();
    }
});

/**
 * Methods
 */

async function getSessionChatList() {
    const chatList = window.sessionStorage.getItem("chatList");
    console.log("Chat init! ", chatList);

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

function onSelect(idx) {
    // 채팅 생성 중에는 예시 문구 추가 불가
    if (isGenerating.value) {
        isVisible.value = true;

        setTimeout(() => {
            isVisible.value = false;
        }, 3000);
        return;
    }
    store.addHelperChat(idx + 1);
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
