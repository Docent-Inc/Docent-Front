<template>
    <div class="custom-select" :tabindex="tabindex" @blur="open = false">
        <div
            v-if="!disabled"
            class="selected"
            :class="{ open: open, disabled: disabled }"
            @click="open = !open"
        >
            {{ selected }}
        </div>
        <div v-else class="disabled">
            {{ selected }}
        </div>
        <div class="items" :class="{ selectHide: !open }">
            <div
                v-for="(option, i) of options"
                :key="i"
                @click="
                    selected = option;
                    open = false;
                    $emit('input', option);
                "
                class="item"
                :class="{ selected: selected === option }"
            >
                {{ option }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            required: true,
        },
        default: {
            type: String,
            required: false,
            default: null,
        },
        tabindex: {
            type: Number,
            required: false,
            default: 0,
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            selected: this.default
                ? this.default
                : this.options.length > 0
                ? this.options[0]
                : null,
            open: false,
        };
    },
    mounted() {
        this.$emit("input", this.selected);
    },
};
</script>

<style lang="scss" scoped>
.custom-select {
    position: relative;
    width: 100%;
    text-align: left;
    outline: none;
    height: 47px;
    line-height: 47px;

    color: #000;
    font-family: "Pretendard Bold";
    font-size: 20px;
    line-height: 31.2px; /* 141.818% */
}
.custom-select .disabled {
    border-bottom: 1px solid rgba(117, 117, 117, 0.7);
    color: rgba(0, 0, 0, 0.7);
}

.custom-select .selected {
    background-color: #fff;
    border-bottom: 2px solid #00847e;
    cursor: pointer;
    user-select: none;
}

.custom-select .selected.open {
    border: none;
}

.custom-select .items {
    color: #fff;
    border-radius: 5px;
    overflow: scroll;
    max-height: 150px;
    border: 2px solid #00847e;
    position: absolute;
    background-color: #fff;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    .item {
        color: #d2d2d0;
        text-align: center;
        font-family: "Pretendard Medium";
        font-size: 22px;
        line-height: 31.2px; /* 141.818% */
        padding: 8px 0;

        cursor: pointer;
        user-select: none;
        border-bottom: 1px solid #d9d9d9;
    }
    div:hover {
        background-color: rgba(117, 117, 117, 0.1);
    }
    .item:last-child {
        border-bottom: none;
    }
    .selected {
        color: #000;
        font-family: "Pretendard Bold";
    }
}
.selectHide {
    display: none;
}
</style>
