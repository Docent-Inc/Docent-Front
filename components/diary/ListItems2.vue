<template>
    <div class="list-items">
        <div class="add_btn-box">
            <AddBtn :isList="true" />
        </div>
        <!-- <div v-if="loadingTab === list[0]?.diary_type" class="item empty" /> -->
        <div v-if="isLoading" class="item empty" />
        <div v-else-if="pages">
            <span v-if="isFetching && !isFetchingNextPage">Fetching...</span>
            <!-- {{ data.pages }} -->
            <!-- <div v-for="(data, idx) in list" :key="idx">
                <ListMemo :memo="data" v-if="data.diary_type === 3" />
                <ListDiary :diary="data" v-else />
                <hr />
            </div> -->
            <div v-for="(page, i) in pages" :key="i">
                <div v-for="(data, j) in page.data.list" :key="j">
                    {{ data.id }}
                    fjsdlfjksf dfkjslfks<br />
                    >
                    <!-- <ListMemo :memo="data" v-if="data.diary_type === 3" />
                <ListDiary :diary="data" v-else />
                <hr /> -->
                </div>
            </div>
        </div>

        <InfiniteLoading
            :first-load="false"
            :distance="1000"
            @infinite="loadMore"
        />
    </div>
</template>
<script>
import InfiniteLoading from "v3-infinite-loading";
import ListDiary from "../../components/diary/ListDiary.vue";
import ListMemo from "../../components/diary/ListMemo.vue";
import AddBtn from "../common/buttons/AddBtn.vue";

export default {
    name: "ListItems",
    components: { ListDiary, ListMemo, AddBtn, InfiniteLoading },
    props: {
        list: {
            type: Array,
            required: true,
            default: [],
        },
        loadingTab: Number,
    },
};
</script>

<script setup>
import { useDiaryService } from "../services/diary";
const props = defineProps({
    type: { type: Number, default: 0 },
});
const totalCounts = ref([0, 0, 0, 0]);
const page = ref(1);

function getMypageList() {
    const typeName = ["calendar", "dream", "diary", "memo"];
    return useDiaryService().getGalleryList(typeName[props.type], page.value);
}

const {
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    data: data,
    fetchNextPage,
} = useInfiniteQuery({
    queryKey: ["mypage", props.type, page.value],
    queryFn: () => getMypageList(),
    getNextPageParam: (lastPage, pages) => {
        // page.value++;
        // console.log("page", page.value);
        return page.value;
    },
});

const pages = computed(() => {
    // console.log("List", ...list.value);
    // console.log("Data", ...data.value.data.list);
    // return page.value === 1
    //     ? data.value.data.list
    //     : [...list.value, ...data.value.data.list];

    console.log("****", data?.value);
    totalCounts.value[props.type] = data.value.pages.lastPage.data.total_count;

    return data?.value?.pages;
});

async function loadMore() {
    console.log(">>Loadmore!", isLoading.value, "/", isFetching.value);
    // // console.log(">>", list.value.length, totalCounts.value[props.type]);

    if (isLoading.value || isFetching.value) return;

    page.value++;
    fetchNextPage();
    // if (!isLoading.value && list.value.length < totalCounts.value[props.type]) {
    //     console.log("여기!");
    //     page.value = page.value + 1;
    //     await nextTick();
    //     fetchNextPage();
    // }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.list-items {
    padding: 1.25rem;

    &:last-child {
        padding-bottom: 2rem;
    }
}
.add_btn-box {
    margin-bottom: 0.8rem;
}

.empty {
    @include skeleton;
    border-radius: $border-radius-default;
    height: 5rem;
    margin-bottom: 0.8rem;
}
</style>
