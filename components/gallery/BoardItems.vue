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
  width: calc(100vw);
  margin-left: calc(-2.35rem);
  margin-right: calc(-2.35rem);
  padding-top: 0;
  box-sizing: border-box;
  justify-content: flex-start;
  gap: 6px;

  .item {
    flex: 0 0 calc(50% - 3px);
    height: auto;
    box-sizing: border-box;

    &:first-child {
      margin-right: auto;
    }

    &:last-child {
      margin-left: auto;
    }
  }
}

</style>


