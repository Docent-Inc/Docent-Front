<template>
  <div class="item_diary" @click="showDetail">
    <div class="diary_content">
      <div class="diary_title">{{ this.diary.diary_name }}</div>
      <div class="diary_date">{{ this.$dayjs(this.diary.create_date).format("YYYY.MM.DD") }}</div>
    </div>
    <div class="diary_icon">
      <v-icon :class="iconClass" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ListDiary",
  props: {
    diary: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  computed: {
    iconClass() {
      switch (this.diary.diary_type) {
        case 1:
          return 'ic_tag2_dream';
        case 2:
          return 'ic_tag2_diary';
      }
    }
  },
  methods: {
    showDetail() {
      this.$router.push(`/diary/${this.diary.id}?type=${this.diary.diary_type}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.item_diary {
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
  .diary_content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 73px);
    .diary_title {
      color: var(--gray-700, #374151);
      font-family: "Pretendard Medium";
      font-size: 16px;
      line-height: 160%;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .diary_date {
      color: var(--gray-400, #9CA3AF);
      margin-top: 8px;
      font-family: Pretendard;
      font-size: 14px;
      line-height: 160%;
      text-align: left;
    }
  }
}
.ic_tag2_diary {
  width: 45px;
  height: 32px;
  margin-bottom: 36px;
}
.ic_tag2_dream {
  width: 35px;
  height: 32px;
  margin-bottom: 36px;
}
</style>
