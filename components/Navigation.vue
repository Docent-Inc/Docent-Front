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
            <img :src="docentSVG" />
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
import DOCENTSVG from "../assets/images/nav_docent.svg";

export default {
    name: "Navigation",
    data() {
        return {
            docentSVG: DOCENTSVG,
        };
    },
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
    width: 100%;
    height: 100%;
    font-size: 40px;

    display: flex;
    align-items: center;
}
</style>
