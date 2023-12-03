<template>
    <div
        class="chat-box-wrapper animate__animated animate__slideInUp"
        :class="{ right: !chat.is_docent }"
    >
        <!-- 도슨트  -->
        <div v-if="chat.is_docent" style="width: 100%" class="chat-docent">
            <div class="chat-docent-profile">
                <div class="chat-profile">
                    <Icon class="ic_profile_ai" />
                </div>

                <!-- <div class="chat-title" id="chat-title">
                    {{ chat.text }}
                </div> -->

                <div
                    class="chat-title"
                    id="chat-title"
                    v-html="processedText"
                ></div>
            </div>

            <!-- 결과  -->
            <div v-if="chat.type === 'result'" class="chat-result">
                <!-- <div class="chat-title">
                    {{ chat.text }}
                </div> -->
                <div class="chat-diary" v-if="chat.result.text_type === 2">
                    <img :src="chat.result.content.image_url" />
                    <div class="chat-diary-title">
                        {{ chat.result.content.diary_name }}
                    </div>
                </div>
                <div class="chat-images" v-if="chat.result.text_type === -1">
                    <img :src="url" v-for="url in chat.result.content.images" />
                </div>
            </div>
        </div>

        <!-- 유저 -->
        <div class="chat-user" v-else>
            {{ chat.text }}
        </div>
    </div>
</template>
<script>
import Icon from "~/components/common/Icon.vue";

export default {
    components: { Icon },
    props: {
        chat: { type: Object, required: true, default: () => {} },
    },
    computed: {
        processedText() {
            return this.chat.text.replace(
                /\*(.*?)\*/g,
                '<span style="color: #6366f1;">$1</span>',
            );
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.chat-title {
    color: $vc-gray-700;
    font-family: "Pretendard Bold";
    font-size: 20px;
    line-height: 150%; /* 30px */
    padding-bottom: 0.5rem;
    white-space: pre-wrap;
    word-wrap: break-word;

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

// 결과 UI

.chat-result {
    // max-width: 80%;
    border-radius: 0.625rem;
    position: relative;
    margin-top: 8px;
    margin-bottom: 2rem;

    display: flex;
    flex-direction: column;

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

    .chat-diary {
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        margin-top: 16px;
        align-self: center;

        img {
            width: 100%;
            // width: 350px;
            height: 305px;

            object-fit: cover;
        }
        .chat-diary-title {
            width: 100%;
            padding: 12px;

            font-family: "Pretendard Bold";
            font-size: 14px;
            line-height: 160%;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            color: #fff;
            background: #6e6eff;
        }
    }

    .chat-images {
        width: 100%;
        display: flex;
        justify-content: space-evenly;

        img {
            width: 45%;
        }
    }
}
</style>
