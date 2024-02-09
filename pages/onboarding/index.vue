<template>
    <div class="viewport">
        <!-- (1) 헤더 -->
<!--        <div class="header">-->
<!--            <div class="onboarding-title">튜토리얼</div>-->

<!--            <div class="onboarding-skip" @click="goSignIn">건너뛰기</div>-->
<!--        </div>-->

        <!-- (2) 본문  -->
        <div class="layout">
            <transition name="slide" mode="out-in">
                <div :key="page_number" :class="`ic_onboarding_${page_number}`"></div>
            </transition>
<!--            <div class="contents" ref="scrollableRef">-->
<!--                <ExampleChatBox-->
<!--                    v-for="(chat, idx) in exampleList"-->
<!--                    :key="idx"-->
<!--                    :chat="chat"-->
<!--                    class="chat-box"-->
<!--                />-->
<!--            </div>-->
        </div>
        <div class="bottom">
<!--            <div-->
<!--                class="onabording-button animate__animated animate__fadeIn"-->
<!--                v-if="showButton"-->
<!--                @click="push2List"-->
<!--            >-->
<!--                오늘은 인상깊은 날이다. 나만의 공간에서 나를 도와줄 기록 비서-->
<!--                Looi와 만나게 되었다. 기록 열심히 해야지!-->
<!--            </div>-->
            <div class="onabording-button" @click="next">
                다음
            </div>

<!--            <div class="chat-loading" v-if="isLoading">-->
<!--                <img src="@/assets/images/pages/chat/loading-dot.gif" />-->
<!--            </div>-->

<!--            <div-->
<!--                class="button primary animate__animated animate__fadeIn"-->
<!--                v-if="showStartButton"-->
<!--                @click="goSignIn"-->
<!--            >-->
<!--                Looi 가입하러 가기-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
import ExampleChatBox from "../../components/chat/ExampleChatBox.vue";
import ChatResult from "../../components/chat/ChatBox.vue";

export default {
    name: "Chat",
    components: { ExampleChatBox, ChatResult },
    data() {
        return {
            page_number: 0,
        }
    }
};
</script>

<script setup>
import { watch } from "vue";

import { smoothScroll } from "@/utils/animation";
import OnboardingJSON from "@/assets/json/onboarding.json";
// OnboardingJSON = [[인사 ~ 버튼 클릭 전], [버튼 클릭 시], [버튼 클릭 결과], [보고서 예시 ~ 시작]]

/**
 * Data
 */
const router = useRouter();
const { $native } = useNuxtApp();
let page_number = ref(0);
const exampleList = ref([]);
const showButton = ref(false);
const isLoading = ref(false);
const showStartButton = ref(false);
watch(
    () => exampleList.value,
    () => {
        updateCSS();
    },
    { deep: true },
);

/**
 * LifeCycle
 */
onBeforeMount(() => {
    $native.controlSafeArea(true);
});

onMounted(() => {
    push1List(OnboardingJSON[0]);
    page_number.value++;
});

/**
 * Methods
 * 1. push1List [인사 ~ 버튼 클릭 전]
 * 2. push2List [버튼 클릭 시]
 * 3. push3List [버튼 클릭 결과]
 * 4. push4List [보고서 예시 ~ 시작]
 */

async function next() {
    if(page_number.value === 4) {
        goSignIn();
        return;
    }
    page_number.value++;
    console.log(page_number.value)
}

// 1. [인사 ~ 버튼 클릭 전]
async function push1List() {
    const list = OnboardingJSON[0];
    let index = 0;
    const interval = setInterval(() => {
        if (index < list.length) {
            exampleList.value.push(list[index]);
            index++;
        } else {
            showButton.value = true;
            clearInterval(interval);
        }
    }, 2000);
}

// 2. [버튼 클릭 시] - showButton
async function push2List() {
    const list = OnboardingJSON[1];
    exampleList.value.push(list[0]);
    showButton.value = false;
    push3List();
}

// 3. [버튼 클릭 결과] - isLoading
async function push3List() {
    const list = OnboardingJSON[2];
    exampleList.value.push(list[0]);
    isLoading.value = true;

    setTimeout(() => {
        isLoading.value = false;
        exampleList.value.push(list[1]);
    }, 2500);

    setTimeout(() => {
        push4List();
    }, 2500);
}

// 4. [보고서 예시 ~ 시작] - showStartButton
async function push4List() {
    const list = OnboardingJSON[3];
    let index = 0;
    const interval = setInterval(() => {
        if (index < list.length) {
            exampleList.value.push(list[index]);
            index++;
        } else {
            showStartButton.value = true;
            clearInterval(interval);
        }
    }, 3500);
}

function goSignIn() {
    if (window) window.localStorage.setItem("isOnboarding", true);
    router.push("/signin");
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
.viewport {
    overflow-x: hidden;
}
.layout {
    height: calc(100%);
    height: calc(
        100% -
            (constant(safe-area-inset-bottom) + constant(safe-area-inset-top))
    );
    height: calc(
        100% - (env(safe-area-inset-bottom) + env(safe-area-inset-top))
    );

    padding-top: 40px;
    padding-bottom: 10rem;
    overflow: hidden; /* 컨테이너 밖으로 나가는 이미지 부분을 숨김 */
    background: $gradient_bg_light;
}

.header {
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.3);
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);
    z-index: 999;

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
    min-height: 5rem;
    background: rgba(255, 255, 255, 255);
    //-webkit-backdrop-filter: blur(16px);
    //backdrop-filter: blur(16px);

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 2rem 0 2rem;
    z-index: 998;
    position: fixed;
    bottom: 0;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);

    .onabording-button {
        border-radius: 12px;
        background: var(--CTA_accent, #9398ff);
        //box-shadow: 0px 8px 30px 0px rgba(70, 96, 250, 0.46);

        text-align: center;
        color: $vc-white;

        /* b2/b2_bold_14 */
        font-family: $font-bold;
        font-size: 14px;
        line-height: 160%; /* 22.4px */

        padding: 11px 12px;
        width: calc(100% - 40px);
    }

    .chat-loading {
        width: 100%;
        height: 40px;
        margin: 16px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        padding: 2rem 1.5rem;

        img {
            height: 160px;
        }
    }
}
.ic_onboarding_1, .ic_onboarding_2, .ic_onboarding_3, .ic_onboarding_4 {
    width: 100%;
    height: 115%;
}
.slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease;
}
/* 새 이미지가 오른쪽에서 들어옴 */
.slide-enter-from {
    transform: translateX(100%);
}
/* 이전 이미지가 왼쪽으로 사라짐 */
.slide-leave-to {
    transform: translateX(-100%);
}
.slide-leave-from, .slide-enter-to {
    transform: translateX(0);
}
</style>
