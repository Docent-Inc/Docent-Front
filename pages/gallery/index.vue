<template>
    <div class="header">
        <Tags
            :tags="['ALL', 'Dream', 'Diary', 'Memo']"
            @select="(idx) => setType(idx)"
            :selected="type"
        />
        <v-icon
            :class="mode === 0 ? 'ic_list' : 'ic_board'"
            @click="changeMode()"
        />
    </div>

    <div class="contents">
        <GalleryListItems :list="list" v-if="mode === 0" />
        <GalleryBoardItems :list="list" v-else />

        <infinite-loading
            v-if="list?.length"
            :first-load="false"
            :distance="1000"
            :top="true"
            @infinite="loadMore"
        />
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useDiaryStore } from "~/store/diary";
import InfiniteLoading from "v3-infinite-loading";
import ListDiary from "../../components/diary/ListDiary.vue";
import ListMemo from "../../components/diary/ListMemo.vue";
import Tags from "../../components/diary/Tags.vue";

export default {
    name: "Gallery",
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    components: { ListDiary, ListMemo, InfiniteLoading, Tags },
    data() {
        return {};
    },
    watch: {
        type() {
            console.log("New type -> ", this.type);
            this.reset();
            this.getGalleryList();
        },
    },
    computed: {
        ...mapState(useDiaryStore, [
            "type",
            "mode",
            "list",
            "totalCounts",
            "data",
        ]),
    },
    async mounted() {
        this.reset();
        await this.getGalleryList();
    },
    methods: {
        ...mapActions(useDiaryStore, [
            "setType",
            "changeMode",
            "getGalleryList",
            "reset",
        ]),
        loadMore() {
            // 조건 확인 후, pageNo +1 해서 loadMore
            if (this.list.length < this.totalCounts) {
                this.getGalleryList();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.header {
    padding: 2rem 2.5rem 2rem 2.5rem;
    justify-content: space-between;
}
.contents {
    width: 100%;
    height: calc(100% - (60px));
    height: calc(100% - (60px + constant(safe-area-inset-top)));
    height: calc(100% - (60px + env(safe-area-inset-top)));

    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));

    padding: 1.31rem 2.35rem;
    background: #f8f8f8;

    // border: 1px solid red;
}
</style>
