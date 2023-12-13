<template>
    <div class="list-items">
        <div class="add_btn-box">
            <AddBtn :isList="true" />
        </div>
        <div v-for="(data, idx) in list" :key="idx">
            <ListMemo :memo="data" v-if="data.diary_type === 3" />
            <ListDiary :diary="data" v-else />
            <hr />
        </div>
    </div>
</template>
<script>
import ListDiary from "../../components/diary/ListDiary.vue";
import ListMemo from "../../components/diary/ListMemo.vue";
import AddBtn from "../common/buttons/AddBtn.vue";

export default {
    name: "ListItems",
    components: { ListDiary, ListMemo, AddBtn },
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
.list-items {
    padding: 1.25rem;

    &:last-child {
        padding-bottom: 2rem;
    }
}
.add_btn-box {
    margin-bottom: 0.8rem;
}
</style>
