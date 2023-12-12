<template>
    <button class="add_btn">
        <div class="add_icon-box">
            <v-icon class="ic_add" />
        </div>
        <div class="add_title">{{ title }}</div>
    </button>
</template>

<script lang="ts">
export default {
    props: {
        title: String,
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

    .add_icon-box {
        width: 44px;
        height: 44px;
        font-size: 5rem;
        font-family: $font-default;

        background: #9ea3ff;
        border-radius: $border-radius-default;
        margin-left: 0.5rem;
        flex-shrink: 0;
        position: relative;

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
    }
}
</style>
