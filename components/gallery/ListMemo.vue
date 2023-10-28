<template>
    <div class="item_memo" @click="this.$router.push(`/memo/${memo.id}`)">
        <div class="memo_content">
            <div class="memo_title">
                {{ formattedTitle }}
            </div>
            <div class="memo_date">
                {{ formattedDate }}
            </div>
        </div>
        <div class="memo_icon">
            <!-- 메모 타입에 따라 다른 아이콘을 보여줄 수 있습니다. -->
            <v-icon class="ic_tag2_memo" />
        </div>
    </div>
</template>

<script>
export default {
    name: "ListDiary",
    props: {
        memo: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    computed: {
        formattedTitle() {
            // 제목이 19자를 초과할 경우 줄여서 표시합니다.
            return this.memo.diary_name.length > 19
                ? this.memo.diary_name.slice(0, 19) + '...'
                : this.memo.diary_name;
        },
        formattedDate() {
            return this.$dayjs(this.memo.create_date).format("YYYY.MM.DD");
        },
    }
};
</script>
<style lang="scss" scoped>
.item_memo {
    width: 100%;
    height: 80px;
    flex-shrink: 0;
    border-radius: 8px;
    background: var(--white, #FFF);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: 8px;

    .memo_content {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .memo_title {
      color: var(--gray-700, #374151);
      /* b1/b1_med_16 */
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 160%; /* 25.6px */
    }

    .memo_date {
      color: var(--gray-400, #9CA3AF);
      margin-top: 8px;
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 160%;
      text-align: left;
    }
  .ic_tag2_memo {
    width: 45px;
    height: 32px;
    margin-bottom: 36px;
  }
}
</style>
