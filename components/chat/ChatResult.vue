<template>
    <div class="chat-result">
        <!-- 타이틀 -->
        <div class="chat-title" v-if="type === 4">
            <span>{{ type_name.replace(" ", "&nbsp;&nbsp;") }}</span
            >이 추가 되었습니다!
        </div>
        <div class="chat-title" v-else>
            <span>{{ type_name.replace(" ", "&nbsp;&nbsp;") }}</span
            >가 추가 되었습니다!
        </div>

        <!-- 내용 -->
        <div v-if="type === 1 || type === 2" class="memo">
            <div class="chat-diary-title">{{ chat.content }}</div>
            <img :src="chat.image_url" />
            <div class="chat-more" @click="more">더 알아보기 &gt;</div>
        </div>

        <div v-if="type === 3">
            <div class="chat-memo">
                {{ chat.content }}
                <div class="chat-more" @click="more">더 알아보기 &gt;</div>
            </div>
        </div>

        <div v-if="type === 4">
            <div class="chat-calendar">
                <div class="chat-calendar-title">
                    {{ chat.content }}
                </div>
                <div class="date">
                    {{ $dayjs(chat.event_time).format("MM.DD ddd") }}요일
                </div>
            </div>

            <button class="button" @click="more">자세히 보기</button>
        </div>
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
.chat-result {
    max-width: 80%;
    padding: 1rem 1.5rem;
    border-radius: 0.625rem;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    position: relative;
    margin-bottom: 2rem;

    .chat-title {
        color: #000;
        font-family: "Pretendard Bold";
        font-size: 10px;
        line-height: 1.3125rem; /* 210% */
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #eeedf4;

        span {
            color: #2c9577;
        }
    }

    .chat-diary-title {
        font-family: "Pretendard Bold";
        font-size: 1rem;
        line-height: 1.3125rem; /* 131.25% */

        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 1.5rem 0;
    }

    img {
        width: 100%;
        margin-bottom: 2.31rem;
    }

    .chat-more {
        color: #2c9577;
        font-family: "Pretendard SemiBold";
        font-size: 0.5rem;
        line-height: 1.3125rem; /* 262.5% */

        position: absolute;
        bottom: 0;
        right: 0;
        margin-right: 1.5rem;
        margin-bottom: 1rem;
        text-align: right;

        cursor: pointer;
    }

    .chat-more.disabled {
        opacity: 0.5;
    }

    .chat-memo {
        color: #000;
        font-family: "Pretendard";
        font-size: 0.8rem;
        line-height: 0.9375rem; /* 150% */

        margin-top: 0.94rem;
        margin-bottom: 2.19rem;
    }
}

.chat-calendar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 0.69rem;
    font-family: "Pretendard Bold";
    font-size: 1.125rem;
    line-height: 1.3125rem; /* 116.667% */

    .chat-calendar-title {
        width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .date {
        font-size: 0.625rem;
        line-height: 1.3125rem; /* 210% */
    }
}

.button {
    width: 100%;
    height: 1.625rem;

    margin-top: 1.5rem;
    padding: 1rem;
    border-radius: 5px;
    background: rgba(44, 149, 119, 0.85);
    font-size: 0.625rem;
    line-height: 1.3125rem; /* 210% */
}

.button.disabled {
    opacity: 0.5;
}
</style>
