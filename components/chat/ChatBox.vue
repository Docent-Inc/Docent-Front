<template>
    <div
        class="chat-box-wrapper animate__animated animate__slideInUp"
        :class="{ right: !chat.is_docent }"
    >
        <!-- 도슨트 -->
        <div v-if="chat.is_docent" style="width: 100%" class="chat-docent">
            <div class="chat-docent-profile">
<!--                <div class="chat-profile">-->
<!--                </div>-->

                <div class="chat-title" v-if="chat.type === 'loading'">
                    잠시 후 기록 결과를 말씀드릴게요! 📑
                </div>
                <div class="chat-title" v-else-if="chat.type !== 'result'">
                  <Icon class="ic_profile_ai" />
                    {{ chat.text }}
                </div>

                <!-- 로딩 -->
<!--                <div class="chat-desc" v-if="chat.type === 'loading'">-->
<!--                    {{ chat.text }}-->
<!--                </div>-->
            </div>

            <!-- 선택 버튼  -->
            <div class="chat-select-box" v-if="chat.type === 'select'">
                <div
                    v-for="(select, idx) in chat.selectList"
                    :key="idx"
                    class="chat-select"
                    :class="{ selected: selected === idx }"
                    @click="onSelect(idx)"
                >
                    {{ select }}
                </div>
            </div>

            <!-- 결과  -->
<!--            <chat-result-->
<!--                v-if="chat.type === 'result'"-->
<!--                :result="chat.result"-->
<!--                :chat="chat.result"-->
<!--                :type="chat.result.text_type"-->
<!--            />-->
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
                "꿈을 해석하고 싶어요!",
                "일기를 쓰고 싶어요!",
                "메모를 하고 싶어요!",
                "일정을 입력하고 싶어요!",
            ],
            selected: null,
        };
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
@import "@/assets/scss/variables.scss";
.chat-title {
    border-radius: 12px;
    background: var(--indigo-500, #6366F1);
    display: flex;
    width: 100%;
    padding: 16px;
    align-items: center;

    gap: 12px;
    color: $vc-gray-700;
    font-family: "Pretendard Bold";
    font-size: 20px;
    line-height: 150%; /* 30px */
    white-space: pre-wrap;
    color: var(--white, #FFF);

    /* h3/h3_bold_18 */
    font-family: "Pretendard Bold";
    font-size: 18px;
    line-height: 160%; /* 28.8px */
    span {
        color: $vc-indigo-500;
    }
}

.chat-desc {
    color: var(--gray-500, #6b7280);
    /* b1/b1_reg_16 */
    font-family: "Pretendard";
    font-size: 16px;
    line-height: 160%; /* 25.6px */
    word-break: break-all;
    margin: 10px 0 20px;

    white-space: pre-wrap;
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

.chat-select-box {
    display: flex;
    flex-wrap: wrap;
    gap: 8px; /* 각 아이템 사이의 간격 */

    .chat-select {
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
