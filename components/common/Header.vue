<template>
    <header class="header">
        <!-- 왼쪽 -->
        <div class="left">
            <div
                v-if="isBackBtnLeftSide"
                class="ic_back-box"
                @click="() => this.$router.back()"
            >
                <v-icon class="ic_back" />
            </div>

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
        </div>
        <!-- 오른쪽 -->
        <button
            v-if="isAddBtnRightSide"
            class="ic_submit-box"
            :class="isSubmit && 'ready'"
            @click="func"
            :disabled="!isSubmit"
        >
            <v-icon :class="[isSubmit ? 'ic_submit_ready' : 'ic_submit']" />
            <span>{{ `${isEditMode ? "수정" : "입력"} 완료하기` }}</span>
        </button>

        <div
            v-else
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
        isBackBtnLeftSide: {
            type: Boolean,
            default: false,
            required: false,
        },
        isAddBtnRightSide: {
            type: Boolean,
            default: false,
            required: false,
        },
        isSubmit: {
            type: Boolean,
            default: false,
            required: false,
        },
        func: {
            default: false,
            required: false,
        },
        isEditMode: {
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

    .left {
        display: flex;
        align-items: center;
    }

    .ic_back-box {
        height: 32px;
        width: 32px;
        cursor: pointer;
        margin: 0 1rem 0 -1rem;

        > i {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

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

    .ic_submit-box {
        width: 115px;
        height: 31px;
        cursor: pointer;
        font-size: 1.2rem;
        font-family: $font-default;
        color: $vc-gray-400;
        background-color: $vc-gray-200;
        border-radius: $border-radius-default;
        display: flex;
        align-items: center;
        justify-content: center;

        > i {
            margin-right: 0.5rem;
            display: flex;
            align-items: center;
            margin-top: 3px;
        }

        &.ready {
            background-color: $vc-indigo-500;
            font-family: $font-bold;
            color: $vc-white;
        }
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

    @media screen and (max-width: 380px) {
        font-size: 90%;
    }
}
</style>
