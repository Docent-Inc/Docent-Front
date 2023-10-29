<template>
  <div class="board-items">
    <div v-for="(data, idx) in list" :key="idx" class="item">
      <BoardMemo :memo="data" v-if="data.diary_type === 3" />
      <BoardDiary :diary="data" v-else />
    </div>
  </div>
</template>

<script>
import BoardMemo from "../../components/gallery/BoardMemo.vue";
import BoardDiary from "../../components/gallery/BoardDiary.vue";

export default {
  name: "BoardItems",
  components: { BoardMemo, BoardDiary },
  props: {
    list: {
      type: Array,
      required: true,
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>
.board-items {
  display: flex;
  flex-wrap: wrap;
  width: calc(100vw); // 뷰포트의 전체 너비를 사용합니다.
  margin-left: calc(-2.35rem); // 상위 요소의 왼쪽 패딩 상쇄
  margin-right: calc(-2.35rem); // 상위 요소의 오른쪽 패딩 상쇄
  padding-top: 0; // 상단 패딩 제거
  box-sizing: border-box; // 이 부분은 패딩과 경계를 포함한 전체 너비 계산을 위해 필요합니다.

  // 아이템 간의 공간을 정확하게 조절하기 위한 스타일
  justify-content: flex-start; // 기본적으로 아이템을 왼쪽에 붙입니다.
  gap: 6px; // 아이템 사이의 간격을 설정합니다.

  .item {
    flex: 0 0 calc(50% - 3px); // 아이템 너비를 계산하고, 아이템 사이의 공간을 고려합니다.
    height: auto; // 아이템 높이 (내용에 따라 자동 조정)
    box-sizing: border-box; // 테두리 및 패딩을 총 너비/높이에 포함

    // 첫 번째 아이템 (왼쪽 아이템)에 대한 추가 스타일
    &:first-child {
      margin-right: auto; // 첫 번째 아이템을 왼쪽에 붙이고 나머지 공간을 오른쪽에 남깁니다.
    }

    // 마지막 아이템 (오른쪽 아이템)에 대한 추가 스타일
    &:last-child {
      margin-left: auto; // 마지막 아이템을 오른쪽에 붙이고 나머지 공간을 왼쪽에 남깁니다.
    }
  }
}

</style>


