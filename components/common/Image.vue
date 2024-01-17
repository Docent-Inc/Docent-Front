<template>
    <img
        :src="imageUrl"
        :style="{ width: width, maxWidth: maxWidth }"
        @error="
            () => {
                isError = true;
            }
        "
    />
</template>

<script>
import EMPTY_URL from "@/assets/images/commons/ic_empty.png";

export default {
    name: "Icon",
    props: {
        url: {
            type: String,
            required: true,
            default: "",
        },
        width: {
            type: String,
            required: false,
            default: "50%",
        },
        maxWidth: {
            type: String,
            required: false,
            default: "none",
        },
    },
    data() {
        return {
            isError: false,
        };
    },
    computed: {
        imageUrl() {
            if (!this.isError && this.url) return this.url;
            else return EMPTY_URL;
        },
    },
};
</script>
<style lang="scss" scoped>
img {
    aspect-ratio: 1/1;
}
</style>
