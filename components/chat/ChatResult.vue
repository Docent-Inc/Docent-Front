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
                <div class="chat-more">더 알아보기 &gt;</div>
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

            <button class="button">자세히 보기</button>
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
            console.log("cliclk>>", this.chat);
            const id =
                this.chat.content_type === 1
                    ? this.chat.MorningDiary_id
                    : this.chat.NightDiary_id;

            console.log(`type: ${this.chat.content_type} id: ${id}`);
            this.$router.push(`/diary/${id}?type=${this.chat.content_type}`);
        },
    },
};
</script>
<style lang="scss" scoped>
.chat-result {
    max-width: 80%;
    padding: 2rem 1.5rem;
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
        font-size: 16px;
        line-height: 1.4rem;

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
        font-size: 8px; // 0.5rem;

        line-height: 1.3125rem; /* 262.5% */
        position: absolute;
        bottom: 0;
        right: 0;
        margin-right: 1.5rem;
        margin-bottom: 1rem;
        text-align: right;

        cursor: pointer;
    }

    .chat-memo {
        color: #000;
        font-family: "Pretendard";
        font-size: 14px;
        line-height: 20px;

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
</style>
