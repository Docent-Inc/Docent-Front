<template>
    <div class="item_board_diary" @click="showDetail">
        <img :src="diary.image_url" />
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
        border-radius: 0.9375rem;
    }
}
</style>
