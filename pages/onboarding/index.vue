<template>
    <div class="viewport">
        <!-- (1) 헤더 -->
        <div class="header">
            <div class="onboarding-title">튜토리얼</div>

            <div class="onboarding-skip">건너뛰기</div>
        </div>

        <!-- (2) 본문  -->
        <div class="layout">
            <div class="contents" ref="scrollableRef">
                <ExampleChatBox
                    v-for="(chat, idx) in exampleList"
                    :key="idx"
                    :chat="chat"
                    class="chat-box"
                />
            </div>
        </div>
        <!-- <ChatInput /> -->
        <div class="bottom">영역</div>
    </div>
</template>

<script>
import ChatBox from "../../components/chat/ChatBox.vue";
import ExampleChatBox from "../../components/chat/ExampleChatBox.vue";
import ChatResult from "../../components/chat/ChatBox.vue";

export default {
    name: "Chat",
    components: { ExampleChatBox, ChatResult },
};
</script>

<script setup>
import { watch } from "vue";

import { smoothScroll } from "@/utils/animation";
import OnboardingJSON from "@/assets/json/onboarding.json";

/**
 * Data
 */
const exampleList = ref([]);
const isVisible = ref(false);
const isLoading = ref(false);
// watch(
//     () => store.chatList,
//     async (newVal, oldVal) => {
//         updateSessionChatList(newVal);
//         updateCSS();
//     },
//     { deep: true },
// );

/**
 * LifeCycle
 */
onMounted(() => {
    // JSON 불러와서 timeout 걸어서 올라오게
    // updateCSS();

    exampleList.value = OnboardingJSON;
    // updateCSS();
    isVisible.value = false;
});

/**
 * Methods
 */

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
.layout {
    height: calc(100%);
    height: calc(
        100% -
            (constant(safe-area-inset-bottom) + constant(safe-area-inset-top))
    );
    height: calc(
        100% - (env(safe-area-inset-bottom) + env(safe-area-inset-top))
    );

    padding-top: 60px;
    padding-bottom: 10rem;
    background: $gradient_bg_light;
}

.header {
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.3);
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);

    border: none;
    padding: 0 20px;

    .onboarding-title {
        color: $vc-gray-800;
        font-family: $font-semi-bold;
        font-size: 16px;
        line-height: 150%; /* 1.5rem */
    }

    .onboarding-skip {
        color: $vc-indigo-500;
        font-family: $font-default;
        font-size: 14px;
        line-height: 160%; /* 22.4px */
    }
}
.contents {
    width: 100%;
    height: 100%;

    overflow-y: scroll;
    padding: 2rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    scroll-behavior: smooth;
}

.bottom {
    width: 100%;
    max-width: 500px;
    min-height: 10rem;
    background: rgba(255, 255, 255, 0.5);
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1.5rem 0 3rem;
    z-index: 10;
    position: fixed;
    bottom: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
}
</style>
