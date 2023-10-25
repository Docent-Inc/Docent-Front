<template>
    <div class="chat-box-wrapper" :class="{ right: !chat.is_docent }">
        <!-- 도슨트 -->
        <div v-if="chat.is_docent" style="width: 100%" class="chat-docent">
            <div class="chat-docent-profile">
                <div class="chat-profile">
                    <Icon class="ic_profile_ai" />
                </div>

                <div class="chat-title" v-if="chat.type !== 'result'">
                    {{ chat.text }}
                </div>
            </div>

            <!-- 로딩 -->
            <div class="chat-loading" v-if="chat.type === 'loading'">
                <img src="../../assets/images/loading-dot.gif" />
            </div>

            <!-- 선택 버튼  -->
            <div class="chat-select-box" v-if="chat.type === 'select'">
                <div
                    v-for="(select, idx) in selectList"
                    :key="idx"
                    class="chat-select"
                    :class="{ selected: selected === idx }"
                    @click="onSelect(idx)"
                >
                    {{ select }}
                </div>
            </div>

            <!-- 결과  -->
            <chat-result
                v-if="chat.type === 'result'"
                :result="chat.result"
                :chat="chat.result"
                :type="chat.result.content_type"
            />
        </div>
        <!-- 유저 -->
        <div class="chat-user" v-else>
            {{ chat.text }}
        </div>

        <!-- 날짜 -->
    </div>
</template>
<script>
import Icon from "~/components/common/Icon.vue";

export default {
    components: { Icon },
    props: {
        chat: { type: Object, required: true, default: () => {} },
    },
    data() {
        return {
            selectList: [
                "꿈을 기록하고 싶어요!",
                "일기를 기록하고 싶어요!",
                "메모를 하고 싶어요!",
                "일정을 입력하고 싶어요!",
            ],
            selected: null,
        };
    },
    computed: {
        primaryText() {
            // if (this.chat.type === 'result') {
            //     if (this.chat.result.type === 3 || this.chat.result.type === 4) {
            //         return this.title[0];
            //     } else {
            //         return '그런 일이 있었군요, 유신님의 말씀을 토대로 ' + this.title[0];
            //     }
            // }
            // return '';
        },
        defaultText() {},
    },
    methods: {
        onSelect(idx) {
            this.selected = idx;
            this.$emit("select", idx);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/colors.scss";
.chat-title {
    color: $vc-gray-700;
    font-family: "Pretendard Bold";
    font-size: 20px;
    line-height: 150%; /* 30px */
    padding-bottom: 0.5rem;
    span {
        color: $vc-indigo-500;
    }
}

.chat-box-wrapper {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: fit-content;
    // border: 1px solid red;
}
.chat-box-wrapper.right {
    justify-content: flex-end;
}
.chat-user {
    display: flex;
    align-items: center;

    padding: 12px;

    color: $vc-indigo-700;
    background: $vc-indigo-200;
    border-radius: 8px;

    font-family: "Pretendard Medium";
    font-size: 14px;
    line-height: 160%;

    white-space: normal;
    word-break: break-all;
    overflow: hidden;
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
    border-radius: 8px;
    background: #fff;
    img {
        height: 160px;
    }
}

.chat-select-box {
    display: grid;
    justify-content: start;
    grid-template-columns: auto auto;
    grid-auto-flow: row;
    gap: 8px;

    .chat-select {
        width: fit-content;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.6);
        color: $vc-gray-500;
        font-family: "Pretendard";
        font-size: 12px;
        line-height: 160%; /* 19.2px */
        padding: 8px 12px;
        cursor: pointer;
    }

    .chat-select.selected {
        background: $vc-violet-200;
        color: $vc-violet-500;
        font-family: "Pretendard Medium";
    }
}
.chat-profile {
    margin: 8px 0;
}

.chat-small {
    // border: 1px solid green;

    transform: scale(0.8);
    opacity: 0.5;
    transition:
        transform 0.5s,
        opacity 0.5s;
    transform-origin: left top;
}
</style>
