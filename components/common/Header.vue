<template>
    <header class="header">
        <!-- 왼쪽 -->
        <div
            v-if="isLogoLeftSide"
            class="ic_logo-box"
            @click="() => this.$router.push('/home')"
        >
            <v-icon class="ic_home_logo" />
        </div>

        <h1 v-else class="title-box">
            {{ title }}
        </h1>

        <!-- 오른쪽 -->
        <div
            class="ic_setting-box"
            @click="() => this.$router.push('/setting')"
        >
            <v-icon class="ic_setting" />
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    props: {
        title: {
            type: String,
            required: false,
        },
        isLogoLeftSide: {
            type: Boolean,
            default: false,
            required: false,
        },
        isSettingRightSide: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $padding-default;

    .ic_logo-box {
        height: 29px;
        width: 62px;
        cursor: pointer;

        > i {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .title-box {
      font-family: $font-semi-bold;
    }

    .ic_setting-box {
        width: 32px;
        height: 32px;
        cursor: pointer;

        > i {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
