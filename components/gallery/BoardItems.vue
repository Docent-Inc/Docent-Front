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
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .item {
        width: 100%;
        aspect-ratio: 1/1;
        text-align: center;
        padding: 5%;

        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
