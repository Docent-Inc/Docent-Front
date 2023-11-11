<template>
    <div class="bottom-sheet-wrapper" @click="(e) => onClick(e, 'wrapper')">
        <div class="bottom-sheet" :class="animateClass">
            <div class="bottom-sheet-top">
                <Icon class="ic_detail" @click="(e) => onClick(e, 'button')" />
            </div>
            <div class="bottom-sheet-contents" v-if="isOpen">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from "./Icon.vue";

export default {
    name: "BottomSheet",
    components: { Icon },
    props: {
        minHeight: {
            type: String,
            default: "30%",
        },
    },
    computed: {
        animateClass() {
            if (this.isOpen) return "animate__animated animate__slideInUp";
            else return "";
        },
    },
    data() {
        return {
            isOpen: false,
        };
    },
    methods: {
        onClick(e, area) {
            e.stopPropagation();
            if (!this.isOpen && area === "wrapper") return;

            this.isOpen = !this.isOpen;
        },
    },
};
</script>
<style lang="scss" scoped>
.bottom-sheet-wrapper {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    align-items: flex-end;
}

.bottom-sheet {
    width: 100%;
    max-height: 90%;
    border-radius: 12px 12px 0px 0px;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(51px);

    color: #fff;
    padding: 20px;

    .bottom-sheet-top {
        height: 32px;
        margin-bottom: 14px;
        .ic_detail {
            margin: 0 auto;
        }
    }

    .bottom-sheet-contents {
        max-height: calc((100vh * 0.9) - (40px + 32px + 14px));
        overflow-y: scroll;
    }
}

@keyframes customSlideOutDown {
    0% {
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        visibility: visible;
    }

    100% {
        -webkit-transform: translate3d(0, 10%, 0);
        transform: translate3d(0, 10%, 0);
    }
}

.animate__customSlideOutDown {
    animation-name: customSlideOutDown;
}
</style>
