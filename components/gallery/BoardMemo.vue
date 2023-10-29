<template>
    <div class="item_board_memo">
      <div class="memo_title">
        {{ formattedTitle }}
      </div>
      <div class="memo_text">
        {{ formattedContent }}
      </div>
      <div class="memo_date">
        {{ $dayjs(memo.create_date).format("YYYY.MM.DD") }}
      </div>
      <div class="memo_icon"><v-icon class="ic_tag2_memo" /></div>
        <div
            class="memo_more"
            @click="this.$router.push(`/memo/${memo.id}`)"
        >
      </div>
    </div>
</template>
<script>
export default {
    name: "BoardMemo",
    props: {
        memo: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    computed: {
    }
};
</script>
<style lang="scss" scoped>
.item_board_memo {
  width: 100%;
  padding-top: 100%;
  position: relative;
  background-color: #FFFFFF;
  overflow: hidden;

  .memo_text, .memo_title, {
    position: absolute;
    width: calc(100% - 40px);
    left: 20px;
  }
    .memo_title {
        top: 0;
        margin-top: 12px;
        color: #010101;
        font-family: "Pretendard SemiBold";
        font-size: 16px;
        line-height: 20px;
        max-height: 40px;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .memo_text {
      top: 0;
      margin-top: 52px;
      color: var(--gray-400, #9CA3AF);
      font-family: "Pretendard";
      font-size: 12px;
      line-height: 160%;
    }
    .memo_date {
      position: absolute;
      bottom: 0;
      left: 0;
      margin-left: 12px;
      margin-bottom: 12px;
      display: flex;
      height: 32px;
      padding: 7px 11px;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.40);
      border-radius: 8px;
      color: var(--gray-50, #F9FAFB);
      text-align: center;
      font-family: "Pretendard Medium";
      font-size: 12px;
      line-height: 160%;
    }
  .memo_icon {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 12px;
    margin-bottom: 12px;
  }
  .ic_tag2_memo {
    width: 45px;
    height: 32px;
  }
}
</style>
