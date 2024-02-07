<template>
    <v-icon
        :class="isDark ? 'ic_back_white' : 'ic_back'"
        @click="goBackOrHome"
    />
</template>

<script lang="ts">
export default {
    props: {
        isDark: Boolean,
    },
    methods: {
        goBackOrHome() {
            // console.log(this.$route.path);
            if(this.$route.path == "/mypage") {
                this.$router.push("/chat");
            } else if (this.$route.path == "/edit") {
                this.$router.push("/mypage");
            }
            else {
                this.$router.back();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
</style>
