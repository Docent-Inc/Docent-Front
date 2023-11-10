<template>
    <div v-if="show" class="modal-background" @click.stop="closeModal">
        <button type="button" class="close-icon">
            <v-icon class="ic_close"></v-icon>
        </button>
        <div @click="preventClose">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "SimpleModal",
    props: ["show"],
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
@import "@/assets/scss/colors.scss";

.modal-background {
    width: 100vw;
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

    .close-icon {
        position: absolute;
        top: 2rem;
        left: 2rem;
        width: 36px;
        height: 36px;
        border-radius: 8px;
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
