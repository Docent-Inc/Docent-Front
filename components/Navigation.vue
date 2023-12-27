<template>
    <nav
        class="navigation"
        :class="{ dark: isDark, chat: isActive('/chat') }"
        aria-label="홈으로 이동"
    >
        <button type="button" class="icon" @click="navigateTo(`/home`)">
            <v-icon
                @click="navigateTo(`/home`)"
                class="nav_home"
                :class="{ active: isActive('/home') }"
            >
            </v-icon>
        </button>
        <button
            type="button"
            @click="navigateTo(`/chat`)"
            aria-label="채팅으로 이동"
            class="icon logo"
        >
            <v-icon
                @click="navigateTo(`/chat`)"
                class="nav_default"
                :class="{ active: isActive('/chat') }"
                role="img"
                aria-hidden="true"
            >
            </v-icon>
        </button>
        <button
            type="button"
            class="icon"
            @click="navigateTo(`/mypage`)"
            aria-label="마이페이지로 이동"
        >
            <v-icon class="nav_mypage" :class="{ active: isActive('/mypage') }">
            </v-icon>
        </button>
    </nav>
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
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    > i {
        width: 85px;
        height: 85px;
    }
}

.navigation.dark {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(16px);
}

.navigation.chat {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(16px);
    border-top: none;
    margin-top: -2rem;
}
</style>
