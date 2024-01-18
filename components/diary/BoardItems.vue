<template>
    <div v-show="show">
        <Starter v-if="!isLoading && !isFetching && list.length < 1" />
        <div class="board-items">
            <div class="add_btn-box">
                <AddBtn :isCard="true" />
            </div>

            <div v-for="(data, idx) in list" :key="idx" class="item">
                <BoardMemo :memo="data" v-if="data.diary_type === 3" />
                <BoardDiary :diary="data" v-else />
            </div>

            <!-- page 1인 경우에는 3개, 나머지 경우에는 2개 skeleton 노출 -->
            <div v-if="isFetching" class="item empty" />
            <div v-if="isFetching" class="item empty" />
            <div v-if="isFetching && pageNo === 1" class="item empty" />

            <InfiniteLoading
                :first-load="false"
                :distance="1000"
                @infinite="loadMore"
            />
        </div>
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
};
</script>

<script setup>
import { useDiaryService } from "../services/diary";
/**
 * Data
 */
const props = defineProps({
    type: { type: Number, default: 0 },
    show: { type: Boolean, default: false },
});

const typeNameEN = getTypeNameEN(props.type);
const pageNo = ref(1);
const hasNextPage = computed(() => {
    return list.value.length < totalCounts.value;
});
const list = computed(() => {
    return data.value?.pages?.flatMap((page) => page.data.list) || [];
});

const totalCounts = computed(() => {
    const lastPage = data.value?.pages?.[data.value.pages.length - 1];
    return lastPage?.data.total_count || 0;
});

/**
 * Data Fetching
 */
const {
    isLoading,
    isFetching,
    data: data,
    fetchNextPage,
} = useInfiniteQuery({
    queryKey: ["mypage", props.type, pageNo.value],
    queryFn: () => getMypageList(),
    getNextPageParam: (lastPage, pages) => {
        return hasNextPage ? pageNo.value : undefined;
    },
});

/**
 * Function
 */
function getMypageList() {
    return useDiaryService().getGalleryList(typeNameEN, pageNo.value);
}

function loadMore() {
    console.log(
        ">>Load More - ",
        hasNextPage.value,
        `${list.value.length}/${totalCounts.value}`,
    );
    if (isLoading.value || isFetching.value || !hasNextPage.value) return;

    console.log(">>Load More - OK ", isLoading.value, isFetching.value);

    pageNo.value++;
    fetchNextPage();
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.board-items {
    background: $gradient_bg_light;
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
