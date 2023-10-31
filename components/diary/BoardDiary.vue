<template>
    <div class="item_board_diary" @click="showDetail">
        <img :src="diary.image_url" />
        <div class="diary_date">{{ this.$dayjs(this.diary.create_date).format("YYYY.MM.DD") }}</div>
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
      iconClass() {
        switch (this.diary.diary_type) {
          case 1:
            return 'ic_tag2_dream';
          case 2:
            return 'ic_tag2_diary';
          case 3:
            return 'ic_tag2_memo';
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
  .diary_icon {
    position: absolute;
    right: 0;
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
