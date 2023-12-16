<template>
    <div class="viewport">
        <!-- 채팅 헤더 -->
        <div class="header">
            <div>
                <Icon :class="'ic_arrow'" @click="goHome" />
                <span class="header-title"> Looi </span>
            </div>

            <Icon
                :class="'ic_help'"
                style="margin-right: 10px"
                @click="isVisible = !isVisible"
            />
        </div>

        <div class="layout">
            <slot />
        </div>

        <chat-input />

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
import { mapState, mapActions } from "pinia";
import { useChatStore } from "../store/chat";

import Toast from "~/components/common/Toast.vue";
import Icon from "~/components/common/Icon.vue";
export default {
    components: { Icon, Toast },
    computed: {
        ...mapState(useChatStore, ["isGenerating"]),
    },
    data() {
        return {
            isVisible: false, // 툴팁 visibility
        };
    },
    methods: {
        ...mapActions(useChatStore, ["setResetFlag"]),
        goHome() {
            if (this.isGenerating) {
                this.$eventBus.$emit("onCustomModal", {
                    title: "채팅 데이터를 생성 중입니다.",
                    desc: "취소하시면 입력한 내용이 사라져요!",
                    callback: () => {
                        this.setResetFlag(true);
                        this.$router.push(`/home`);
                    },
                });

                return;
            }

            this.setResetFlag(true);
            this.$router.push(`/home`);
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

// .chat-text {
//     position: fixed;
//     top: 0;
//     width: 100%;
//     border: 1px solid red;
//     z-index: 999;
// }

.layout {
    height: calc(100% - 9rem);
    height: calc(
        100% -
            (
                constant(safe-area-inset-bottom) + constant(safe-area-inset-top) -
                    9rem
            )
    );
    height: calc(
        100% - (env(safe-area-inset-bottom) + env(safe-area-inset-top) - 9rem)
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
    // z-index: 999;

    > div {
        display: flex;
        align-items: center;
        gap: 10px;
    }
}

// Tooltip - https://deeplify.dev/front-end/markup/tooltip
.tooltip {
    position: relative;
    display: block;
    margin: 0 auto;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 150px;
    background-color: rgba(238, 237, 244);
    color: #000;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    font-size: 12px;

    position: absolute;
    z-index: 1;

    b {
        font-family: "Pretendard Bold";
        color: var(--2C9577, #2c9577);
    }
}
.tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    border-style: solid;
    border-width: 5px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
}

.tooltip .tooltip-right {
    top: 5;
    left: 110%;
}

.tooltip .tooltip-right::after {
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-color: transparent rgba(238, 237, 244, 0.45) transparent transparent;
}
</style>
