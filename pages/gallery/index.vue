<template>
    <div class="viewport">
        Gallery {{ type }} -> {{ list.length }} / {{ totalCounts }}
        <div>
            <div v-for="(data, idx) in list" :key="idx">
                {{ data.content_type }} | {{ data.content }}
                <img :src="data.image_url" width="200" />
                <hr />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useGalleryStore } from "~/store/gallery";

export default {
    name: "Gallery",
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    data() {
        return {};
    },
    computed: {
        ...mapState(useGalleryStore, ["list", "type", "totalCounts", "data"]),
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

<style lang="scss" scoped></style>
