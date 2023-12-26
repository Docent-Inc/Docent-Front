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
        <div v-if="type === 1 || type === 2" class="chat-diary">
            <div class="chat-diary-content">
              <div class="chat-result-content">{{ limitedContentDiary }}</div>
              <div class="chat-more-diary" @click="more">
                <span class="chat-more-content">자세히 보러가기</span>
              </div>
            </div>
        </div>

        <div v-if="type === 3 || type === 4" class="chat-memo">
            <div class="chat-memo-content">
                <div
                    class="chat-result-content"
                    v-if="type === 3">
                    {{ limitedContentMemo }}
                </div>
                <div
                    class="chat-result-content"
                    v-if="type === 4">
                  {{ limitedContentCalendar }}
                </div>
              <div class="chat-more-memo" @click="more">
                <span class="chat-more-content">자세히 보러가기</span>
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
        limitedContentDiary() {
          const content = this.result.content.content;
          const maxLength = 85;
          return content.length > maxLength
              ? content.substring(0, maxLength) + "..."
              : content;
        },
        limitedContentMemo() {
          const content = this.result.content.content;
          const maxLength = 12;
          return content.length > maxLength
              ? content.substring(0, maxLength) + "..."
              : content;
        },
        limitedContentCalendar() {
          const content = this.result.content.title;
          const maxLength = 12;
          return content.length > maxLength
              ? content.substring(0, maxLength) + "..."
              : content;
        },
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
                        `/mypage?tab=calendar&date=${this.result.content.start_time}`,
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 20px;

      .chat-diary-content {
        width: 100%;
        border-radius: 8px;
        background: #FFF;
        padding: 12px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 20px;

        .chat-result-content {
          width: 100%;
          color: var(--gray-500, #6B7280);

          /* b2/b2_reg_14 */
          font-family: "Pretendard";
          font-size: 14px;
        }
        .chat-more-diary {
          margin-top: 20px;
          display: flex;
          width: 100%;
          height: 40px;
          padding: 6px 12px;
          justify-content: center;
          align-items: center;
          gap: 10px;
          border-radius: 8px;
          background: var(--indigo-50, #EEF2FF);
        }
        .chat-more-content {
          color: var(--indigo-500, #6366F1);

          /* c1/c1_reg_12 */
          font-family: "Pretendard";
          font-size: 12px;
        }
      }
    }

    .chat-memo {
      margin-top: 16px;
      display: inline-flex;
      padding: 12px 12px 13px 12px;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      background: #FFF;

        .chat-memo-content {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--gray-700, #374151);
          /* h3/h3_bold_18 */
          font-family: "Pretendard Bold";
          font-size: 18px;
        }
      .chat-more-memo {
        display: flex;
        width: 100px;
        height: 100%;
        right: 0;
        padding: 6px 12px;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 8px;
        background: var(--indigo-50, #EEF2FF);
      }
      .chat-more-content {
        color: var(--indigo-500, #6366F1);

        /* c1/c1_reg_12 */
        font-family: "Pretendard";
        font-size: 12px;
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
