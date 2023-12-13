<template>
    <button
        class="add_btn"
        :class="isList ? 'list' : isCard ? 'card' : ''"
        @click="handleAddBtn"
    >
        <div
            class="add_icon-box"
            :class="isList ? 'list' : isCard ? 'card' : ''"
        >
            <v-icon v-if="isList" class="ic_add_accent" />
            <v-icon v-else class="ic_add" />
        </div>
        <div class="add_title" :class="isList && 'list'">
            {{ title || "기록 추가하기" }}
        </div>
    </button>
</template>

<script lang="ts">
export default {
    props: {
        title: String,
        isCard: Boolean,
        isList: Boolean,
    },
    methods: {
        handleAddBtn() {
            this.$router.push("edit/record");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.add_btn {
    width: 100%;
    height: 100%;
    background: $vc-accent;
    color: $vc-white;
    display: flex;
    align-items: center;
    border-radius: $border-radius-default;
    font-family: $font-bold;

    &.list {
        background: $vc-white;
    }

    .add_icon-box {
        width: 40px;
        height: 40px;
        font-size: 5rem;
        font-family: $font-default;

        background: #9ea3ff;
        border-radius: $border-radius-default;
        margin: 0.5rem;
        flex-shrink: 0;
        position: relative;

        &.card {
            width: 40px;
            height: 40px;
            margin-bottom: 1rem;
        }

        &.list {
            background: #efeffd;
        }

        > i {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .add_title {
        width: 100%;

        &.list {
            color: $vc-indigo-500;
            text-align: left;
            margin-left: 1rem;
        }
    }

    &.card {
        border-radius: 0;
        flex-direction: column;
        justify-content: center;
    }
}
</style>
