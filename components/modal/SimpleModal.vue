<template>
    <div
        v-if="isModalOpen"
        class="viewport modal-background"
        :class="{ 'in-layout': isInLayout }"
        @click="closeModal"
    >
        <div class="close-box">
            <button type="button" class="close-icon">
                <v-icon class="ic_close"></v-icon>
            </button>
        </div>

        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "SimpleModal",
    props: ["isModalOpen", "isInLayout"],
    methods: {
        closeModal() {
            this.$emit("close");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.modal-background {
    width: 100%;
    height: 100%;
    /* 모바일 하단바 고려 */
    height: stretch;

    top: 0;
    right: 0;
    position: absolute;
    z-index: 999;
    backdrop-filter: blur(2rem) brightness(80%);

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;

    @media screen and (max-height: 650px) {
        padding: 0;
    }

    // &.in-layout {
    //     height: 100%;
    //     width: 100%;
    // }
    .close-box {
        position: absolute;
        top: $padding-default;
        left: $padding-default;

        .close-icon {
            width: 36px;
            height: 36px;
            border-radius: $border-radius-default;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.131);

            i {
                width: 50%;
                height: 50%;
                font-size: 1rem;
            }
        }
    }

    .modal-slot {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
