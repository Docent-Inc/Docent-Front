<template>
    <div class="chat-result">
        <!-- 타이틀 -->
        <div class="chat-title" v-if="type === 3 || type === 4">
            <span>{{ title[0] }}</span
            >{{ title[1] }}
        </div>
        <div class="chat-title" v-else>
            그런 일이 있었군요, {{ user?.nickname }}님의 말씀을 토대로
            <span>{{ title[0] }}</span
            >{{ title[1] }}
        </div>

        <!-- 내용 -->
        <div v-if="type === 1 || type === 2" class="chat-diary" @click="more">
            <div class="chat-more">자세히 보러가기</div>
            <img :src="result.content.image_url" />
            <div class="chat-diary-title">{{ result.content.diary_name }}</div>
        </div>

        <div v-if="type === 3 || type === 4">
            <div class="chat-memo">
                <div class="chat-more" @click="more">자세히 보러가기</div>
                <div class="chat-memo-title">{{ result.content.title }}</div>
                <div
                    class="chat-memo-content"
                    v-if="result.content.content !== ''"
                >
                    {{ result.content.content }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "pinia";
import { useUserStore } from "~/store/user";
export default {
    name: "ChatResult",
    props: {
        type: {
            type: Number,
            required: true,
            default: 1,
        },
        result: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    computed: {
        ...mapState(useUserStore, ["user"]),
        type_name() {
            switch (this.type) {
                case 1:
                    return "🌞 아침 일기";
                case 2:
                    return "🌙 저녁 일기";
                case 3:
                    return "✏️ 메모";
                default:
                    return "✅ 일정";
            }
        },
        title() {
            switch (this.type) {
                case 1:
                    return ["꿈기록", "을 추가했어요! 🌙"];
                case 2:
                    return ["일기", "를 추가했어요! ✏️"];
                case 3:
                    return ["메모", "를 추가했어요! ✏️"];
                default:
                    return [
                        `${this.$dayjs(this.result.content.start_time).format(
                            "ddd요일(MM.DD)",
                        )} 일정`,
                        "을 추가했어요! 🗓️",
                    ];
            }
        },
    },
    methods: {
        more() {
            // console.log(">", this.result);

            switch (this.result.text_type) {
                case 1:
                case 2:
                    this.$router.push(
                        `/diary/${this.result.diary_id}?type=${this.result.text_type}`,
                    );
                    break;

                case 3:
                    this.$router.push(`/memo/${this.result.diary_id}`);
                    break;

                case 4:
                    this.$router.push(
                        `/calendar/?date=${this.result.content.start_time}`,
                    );
                    break;

                default:
                    alert("🔔 서비스 오픈 예정입니다.");
                    break;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
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

    .chat-more {
        font-family: "Pretendard";
        font-size: 12px;
        line-height: 160%; /* 19.2px */

        border-radius: 8px;
        padding: 6px 12px;
        background: $vc-indigo-50;
        color: $vc-indigo-500;

        position: absolute;
        top: 0;
        right: 0;
        margin: 12px;
        cursor: pointer;
    }
    .chat-more.disabled {
        opacity: 0.5;
    }
    .chat-memo {
        border-radius: 8px;
        background: #fff;
        padding: 12px;
        position: relative;

        color: #000;
        font-size: 14px;
        line-height: 20px;
        margin-top: 0.94rem;
        margin-bottom: 2.19rem;

        .chat-memo-title {
            margin-right: 150px;
            color: $vc-gray-700;
            font-family: "Pretendard Bold";
            font-size: 18px;
            line-height: 160%; /* 28.8px */
            max-width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .chat-memo-content {
            color: $vc-gray-400;
            font-family: "Pretendard";
            font-size: 14px;
            line-height: 160%; /* 22.4px */
            margin-top: 14.5px;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
.chat-calendar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 0.69rem;
    font-family: "Pretendard Bold";
    font-size: 18px;
    .chat-calendar-title {
        width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .date {
        font-size: 10px;
    }
}
.button {
    width: 100%;
    margin-top: 1.5rem;
    border-radius: 5px;
    background: rgba(44, 149, 119, 0.85);
}
.button.disabled {
    opacity: 0.5;
}
</style>
