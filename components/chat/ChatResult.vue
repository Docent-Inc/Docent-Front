<template>
    <div class="chat-result">
        <!-- 타이틀 -->
        <div class="chat-title" v-if="type === 4">
            <span>{{ title[0] }}</span
            >{{ title[1] }}
        </div>
        <div class="chat-title" v-else>
            그런 일이 있었군요, 유신님의 말씀을 토대로
            <span>{{ title[0] }}</span
            >{{ title[1] }}
        </div>

        <!-- 내용 -->
        <div v-if="type === 1 || type === 2" class="chat-diary">
            <div class="chat-more" @click="more">자세히 보러가기</div>
            <img :src="chat.image_url" />
            <div class="chat-diary-title">{{ chat.content }}</div>
        </div>

        <div v-if="type === 3 || type === 4">
            <div class="chat-memo">
                <div class="chat-more" @click="more">자세히 보러가기</div>
                <div class="chat-memo-title">{{ chat.content }}</div>
                <div class="chat-memo-content">{{ chat.content }}</div>
            </div>
        </div>

        <!-- <div v-if="type === 4">
            <div class="chat-calendar">
                <div class="chat-calendar-title">
                    {{ chat.content }}
                </div>
                <div class="date">
                    {{ $dayjs(chat.event_time).format("MM.DD ddd") }}요일
                </div>
            </div>

            <button class="button" @click="more">자세히 보기</button>
        </div> -->
    </div>
</template>
<script>
export default {
    name: "ChatResult",
    props: {
        type: {
            type: Number,
            required: true,
            default: 1,
        },
        chat: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    computed: {
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
                    return ["일기", "를 추가했어요! ✏️"];
                case 2:
                    return ["꿈기록", "을 추가했어요! 🌙"];
                case 3:
                    return ["메모", "를 추가했어요! ✏️"];
                default:
                    return [
                        `${this.$dayjs(this.chat.event_time).format(
                            "ddd요일(MM.DD)"
                        )} 일정`,
                        "을 추가했어요! 🗓️",
                    ];
            }
        },
    },
    methods: {
        more() {
            switch (this.chat.content_type) {
                case 1:
                case 2:
                    const id =
                        this.chat.content_type === 1
                            ? this.chat.MorningDiary_id
                            : this.chat.NightDiary_id;

                    this.$router.push(
                        `/diary/${id}?type=${this.chat.content_type}`
                    );
                    break;

                case 3:
                    this.$router.push(`/memo/${this.chat.Memo_id}`);
                    break;

                case 4:
                    this.$router.push(
                        `/calendar/?date=${this.chat.event_time}`
                    );
                    break;
                default:
                    alert("🔔 서비스 오픈 예정입니다.");
                    break;
            }

            console.log("cliclk>>", this.chat);
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/colors.scss";
.chat-result {
    max-width: 80%;
    border-radius: 0.625rem;
    position: relative;
    margin-top: 8px;
    margin-bottom: 2rem;

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
        width: 350px;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        margin-top: 16px;

        img {
            // width: 100%;
            width: 350px;
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
            color: $vc-gray-700;
            font-family: "Pretendard Bold";
            font-size: 18px;
            line-height: 160%; /* 28.8px */
        }

        .chat-memo-content {
            color: $vc-gray-400;
            font-family: "Pretendard";
            font-size: 14px;
            line-height: 160%; /* 22.4px */
            margin-top: 14.5px;
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
