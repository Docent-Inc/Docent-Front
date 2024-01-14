<template>
    <Starter v-if="!isLoading && list.length < 1" />
    <div v-else class="board-items">
        <div class="add_btn-box">
            <AddBtn :isCard="true" />
        </div>

        <div v-for="(data, idx) in list" :key="idx" class="item">
            <BoardMemo :memo="data" v-if="data.diary_type === 3" />
            <BoardDiary :diary="data" v-else />
        </div>

        <div v-if="isFetching" class="item empty" />

        <InfiniteLoading
            :first-load="false"
            :distance="1000"
            @infinite="loadMore"
        />
    </div>
</template>

<script>
import BoardMemo from "~/components/diary/BoardMemo.vue";
import BoardDiary from "~/components/diary/BoardDiary.vue";
import AddBtn from "../common/buttons/AddBtn.vue";
import InfiniteLoading from "v3-infinite-loading";
import Starter from "../../components/diary/Starter.vue";

export default {
    name: "BoardItems",
    components: { BoardMemo, BoardDiary, AddBtn, InfiniteLoading, Starter },
    props: {
        list: {
            type: Array,
            required: true,
            default: [],
        },
        loadingTab: Number,
        show: Boolean,
    },
};
</script>

<script setup>
import { useDiaryService } from "../services/diary";
const props = defineProps({
    type: { type: Number, default: 0 },
});

const pageNo = ref(1);
const totalCounts = ref(0);
const list = ref([]);
const hasNextPage = computed(() => {
    return list.value.length < totalCounts.value;
});

function getMypageList() {
    const typeName = ["calendar", "dream", "diary", "memo"];
    return useDiaryService().getGalleryList(typeName[props.type], pageNo.value);
}

const {
    isLoading,
    isFetching,
    data: data,
    fetchNextPage,
} = useInfiniteQuery({
    queryKey: ["mypage", props.type, pageNo.value],
    queryFn: () => getMypageList(),
    getNextPageParam: (lastPage, pages) => {
        console.log("page", pageNo.value);

        if (!hasNextPage) return undefined;
        return pageNo.value;
    },
});

watch(
    () => data.value,
    () => {
        console.log("****", data?.value);
        const lastPage = data?.value.pages[data?.value.pages.length - 1];
        totalCounts.value = lastPage.data.total_count;
        list.value =
            pageNo.value === 1
                ? lastPage.data.list
                : [...list.value, ...lastPage.data.list];
        console.log(">>list1", list.value, list.value.length);
    },
    { deep: true },
);

watch(
    () => props.type,
    () => {
        console.log("refetch!");
        pageNo.value = 1;
        fetchNextPage();
    },
);

function loadMore() {
    console.log(">>hasNextPage", hasNextPage.value);
    if (isLoading.value || isFetching.value || !hasNextPage.value) return;
    pageNo.value++;
    console.log(">>go next", pageNo.value);

    fetchNextPage();
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

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

        &.empty {
            @include skeleton;
            padding-bottom: calc(50% - 3px);
        }
    }
}

.add_btn-box {
    flex: 0 0 calc(50% - 3px);
    height: auto;
}
</style>
