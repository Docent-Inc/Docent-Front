<template>
    <div class="navigation">
        <v-btn flat @click="navigateTo(`/home`)">
            <v-icon class="nav_home" :class="{ active: isActive('/home') }" />
        </v-btn>

        <v-btn flat @click="navigateTo(`/report`)">
            <v-icon
                class="nav_report"
                :class="{ active: isActive('/report') }"
            />
        </v-btn>

        <v-btn flat @click="navigateTo(`/chat`)">
            <img src="@/assets/images/commons/navigations/nav_docent.svg" />
        </v-btn>

        <v-btn flat @click="navigateTo(`/calendar`)">
            <v-icon
                class="nav_calendar"
                :class="{ active: isActive('/calendar') }"
            />
        </v-btn>

        <v-btn flat @click="navigateTo(`/mypage`)">
            <v-icon
                class="nav_mypage"
                :class="{ active: isActive('/mypage') }"
            />
        </v-btn>
    </div>
</template>

<script>
export default {
    name: "Navigation",
    methods: {
        navigateTo(route) {
            this.$router.push(route);
        },
        isActive(route) {
            return this.$route.path === route;
        },
    },
};
</script>
<style lang="scss" scoped>
.v-btn {
    flex: 1;
    font-size: 56px;
    display: flex;
    align-items: center;
}
</style>
