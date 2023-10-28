<template>
    <div class="item_board_diary" @click="showDetail">
        <img :src="diary.image_url" />
        <div class="diary_date">{{ formattedDate }}</div>
        <div class="diary_icon"><v-icon :class="iconClass" /></div>
    </div>
</template>
<script>
export default {
    name: "BoardDiary",
    props: {
        diary: {
            type: Object,
            required: true,
            default: () => {},
        },
    },
    computed: {
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
            console.log("cliclk>>", this.diary);
            console.log(
                `type: ${this.diary.content_type} id: ${this.diary.id}`
            );
            this.$router.push(
                `/diary/${this.diary.id}?type=${this.diary.content_type}`
            );
        },
    },
};
</script>
<style lang="scss" scoped>
.item_board_diary {
    width: 100%;
    height: 100%;
    position: relative;

    img {
        width: 100%;
        height: 100%;
    }
  .diary_date {
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
  .diary_icon {
    position: absolute;  // 이미지 위에 표시되도록 설정합니다.
    right: 0;  // 왼쪽 하단에 위치하도록 설정합니다.
    bottom: 0;
    margin-right: 12px;
    margin-bottom: 12px;
  }
  .ic_tag2_diary {
    width: 45px;
    height: 32px;
  }
  .ic_tag2_dream {
    width: 35px;
    height: 32px;
  }
}
</style>
