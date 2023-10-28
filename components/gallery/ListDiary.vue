<template>
  <div class="item_diary" @click="showDetail">
    <div class="diary_content">
      <div class="diary_title">{{ formattedTitle }}</div>
      <div class="diary_date">{{ formattedDate }}</div>
    </div>
    <div class="diary_icon">
      <!-- diary.type에 따라 아이콘을 동적으로 변경합니다. -->
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
    formattedTitle() {
      // 제목이 19자를 초과할 경우 줄여서 표시합니다.
      return this.diary.diary_name.length > 19
          ? this.diary.diary_name.slice(0, 19) + '...'
          : this.diary.diary_name;
    },
    formattedDate() {
      return this.$dayjs(this.diary.create_date).format("YYYY.MM.DD");
    },
    iconClass() {
      // 여기서 'type'은 diary 객체의 실제 속성이어야 합니다.
      // 이 속성은 일기의 타입을 나타내야 하며, 이에 따라 적절한 아이콘을 선택합니다.
      console.log("diary.type", this.diary.diary_type);
      switch (this.diary.diary_type) { // 또는 diary.content_type 등의 속성
        case 1:
          return 'ic_tag2_dream'; // 꿈 아이콘의 클래스
        case 2:
          return 'ic_tag2_diary'; // 일기 아이콘의 클래스
        case 3:
          return 'ic_tag2_memo'; // 메모 아이콘의 클래스
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

    .diary_title {
      color: var(--gray-700, #374151);
      /* b1/b1_med_16 */
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 160%; /* 25.6px */
    }

    .diary_date {
      color: var(--gray-400, #9CA3AF);
      margin-top: 8px;
      font-family: Pretendard;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 160%;
      text-align: left;
    }
  }
  //.diary_icon {
  //  right: 0;
  //}
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
