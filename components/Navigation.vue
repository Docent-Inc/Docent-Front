<template>
    <div class="navigation" :class="{ dark: isDark }">
        <Icon
            @click="navigateTo(`/home`)"
            class="icon nav_home"
            :class="{ active: isActive('/home') }"
        >
        </Icon>

        <Icon
            @click="navigateTo(`/report`)"
            class="icon nav_report"
            :class="{ active: isActive('/report') }"
        >
        </Icon>

        <img
            src="@/assets/images/commons/navigations/nav_docent.svg"
            @click="navigateTo(`/chat`)"
            class="icon"
        />

        <Icon
            @click="navigateTo(`/calendar`)"
            class="icon nav_calendar"
            :class="{ active: isActive('/calendar') }"
        >
        </Icon>

        <Icon
            @click="navigateTo(`/mypage`)"
            class="icon nav_mypage"
            :class="{ active: isActive('/mypage') }"
        >
        </Icon>
    </div>
</template>

<script>
import Icon from "~/components/common/Icon.vue";

export default {
    name: "Navigation",
    components: { Icon },
    props: {
        isDark: {
            type: Boolean,
            required: false,
            default: false,
        },
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
.icon {
    flex: 1;
}

.navigation.dark {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px);
    z-index: 998;
}
</style>
