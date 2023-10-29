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
      formattedTitle() {
        // 제목이 19자를 초과할 경우 줄여서 표시합니다.
        if (this.memo.diary_name === "") {
            return "(제목 없음)";
        }
        return this.memo.diary_name.length > 8
            ? this.memo.diary_name.slice(0, 8) + '...'
            : this.memo.diary_name;
      },
      formattedContent() {
        // 제목이 19자를 초과할 경우 줄여서 표시합니다.
        if (this.memo.content === "") {
            return "(내용 없음)";
        }
        return this.memo.content.length > 67
            ? this.memo.content.slice(0, 67) + '...'
            : this.memo.content;
      }
    }
};
</script>
<style lang="scss" scoped>
.item_board_memo {
  width: 100%; // 너비를 부모 요소에 맞춤
  padding-top: 100%; // 상단 패딩을 사용한 정사각형 유지
  position: relative; // 자식 요소에 absolute를 사용할 수 있게 함
  background-color: #FFFFFF; // 배경색 지정 (디자인에 맞게 변경 가능)
  overflow: hidden; // 컨텐츠가 영역을 벗어나면 숨김

  // 내부 요소 스타일링 시작
  .memo_text, .memo_title, {
    position: absolute; // 절대 위치 사용
    width: calc(100% - 40px); // 좌우 패딩 고려한 너비 계산
    left: 20px; // 일관된 좌측 패딩 적용
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
      /* c1/c1_reg_12 */
      font-family: Pretendard;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 160%; /* 19.2px */
    }
    .memo_date {
      position: absolute;  // 이미지 위에 표시되도록 설정합니다.
      bottom: 0;  // 왼쪽 하단에 위치하도록 설정합니다.
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
      /* c1/c1_med_12 */
      font-family: Pretendard;
      font-size: 12px;
      font-style: normal;
      font-weight: 500;
      line-height: 160%; /* 19.2px */
    }
  .memo_icon {
    position: absolute;  // 이미지 위에 표시되도록 설정합니다.
    right: 0;  // 왼쪽 하단에 위치하도록 설정합니다.
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
