<template>
    <div v-for="(data, idx) in list" :key="idx">
        <ListMemo :memo="data" v-if="data.diary_type === 3" />
        <ListDiary :diary="data" v-else />
        <hr />
    </div>
</template>
<script>
import ListDiary from "../../components/diary/ListDiary.vue";
import ListMemo from "../../components/diary/ListMemo.vue";
export default {
    name: "ListItems",
    components: { ListDiary, ListMemo },
    props: {
        list: {
            type: Array,
            required: true,
            default: [],
        },
    },
};
</script>
<style lang="scss" scoped></style>
