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
            if (window.history.length > 1) {
                this.$router.back();
            } else {
                this.$router.push("/chat");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
</style>
