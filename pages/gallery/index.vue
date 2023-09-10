<template>
    <div class="header">
        <Tags
            :tags="['ALL', 'Dream', 'Diary', 'Memo']"
            @select="(idx) => setType(idx)"
            :selected="type"
        />
        <v-icon class="ic_list" />
    </div>

    <div class="contents">
        <!-- Gallery {{ type }} -> {{ list.length }} / {{ totalCounts }} -->

        <div v-for="(data, idx) in list" :key="idx">
            <ListMemo :memo="data" v-if="data.content_type === 3" />
            <ListDiary :diary="data" v-else />
            <hr />
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGalleryStore } from "~/store/gallery";
import ListDiary from "../../components/gallery/ListDiary.vue";
import ListMemo from "../../components/gallery/ListMemo.vue";

export default {
    name: "Gallery",
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    components: { ListDiary, ListMemo },
    data() {
        return {};
    },
    computed: {
        ...mapState(useGalleryStore, ["type", "list", "totalCounts", "data"]),
    },
    async mounted() {
        window.localStorage.setItem(
            "accessToken",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjIwNTM1NDcxNzZ9.Dqf6UOvR-OlKY6cVMjoN0AJ25stW8ojdSy2GZ5dyHlc"
        );
        await this.getGalleryList();
    },
    methods: {
        ...mapActions(useGalleryStore, ["setType", "getGalleryList"]),
    },
};
</script>

<style lang="scss" scoped>
.header {
    padding: 2rem 2.5rem 0 2.5rem;
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

    // border: 1px solid red;
}
</style>
