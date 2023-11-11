<template>
    <img
        :src="imageUrl"
        :style="{ width: width }"
        @error="
            () => {
                isError = true;
            }
        "
    />
</template>

<script>
import EMPTY_URL from "@/assets/images/commons/ic_empty.svg";

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
<style lang="scss" scoped></style>
