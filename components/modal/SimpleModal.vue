<template>
    <div
        v-if="isModalOpen"
        class="modal-background"
        :class="{ 'in-layout': isInLayout }"
        @click.stop="closeModal"
    >
        <div class="close-box">
            <button type="button" class="close-icon">
                <v-icon class="ic_close"></v-icon>
            </button>
        </div>
        <div @click="preventClose">
            <slot></slot>
        </div>
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
        preventClose(event) {
            event.stopPropagation();
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.modal-background {
    width: 100%;
    height: 100vh;
    top: 0;
    right: 0;
    position: absolute;
    z-index: 99;
    backdrop-filter: blur(2rem) brightness(80%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;

    @media screen and (max-height: 700px) {
        padding: 0;
    }

    &.in-layout {
        height: 100%;
        width: 100%;
    }

    .close-icon {
        position: absolute;
        top: $padding-default;
        left: $padding-default;
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
</style>
