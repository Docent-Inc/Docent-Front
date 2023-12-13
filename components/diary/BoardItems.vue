<template>
    <div class="board-items">
        <div class="add_btn-box">
            <AddBtn :isCard="true" />
        </div>
        <div v-for="(data, idx) in list" :key="idx" class="item">
            <BoardMemo :memo="data" v-if="data.diary_type === 3" />
            <BoardDiary :diary="data" v-else />
        </div>
    </div>
</template>

<script>
import BoardMemo from "~/components/diary/BoardMemo.vue";
import BoardDiary from "~/components/diary/BoardDiary.vue";
import AddBtn from "../common/buttons/AddBtn.vue";

export default {
    name: "BoardItems",
    components: { BoardMemo, BoardDiary, AddBtn },
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
    width: 100%;
    padding-top: 1rem;

    box-sizing: border-box;
    justify-content: flex-start;
    gap: 6px;

    &:last-child {
        padding-bottom: 2rem;
    }

    .item {
        flex: 0 0 calc(50% - 3px);
        height: auto;
        box-sizing: border-box;

        // &:first-child {
        //     margin-right: auto;
        // }

        // &:last-child {
        //     margin-left: auto;
        // }
    }
}

.add_btn-box {
    flex: 0 0 calc(50% - 3px);
}
</style>
