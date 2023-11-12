<template>
    <div class="mbti-box">
        <div v-for="pair in mbtiPairs" :key="pair.primary" class="mbti-pair">
            <div
                v-for="option in pair.options"
                :key="option.value"
                :class="{ selected: isSelected(pair.primary, option.value) }"
                @click="
                    toggleSelection(pair.primary, option.value, pair.opposite)
                "
            >
                {{ option.label }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SignUpMBTI",
    data() {
        return {
            mbtiPairs: [
                {
                    primary: "E",
                    opposite: "I",
                    options: [
                        { value: "E", label: "E" },
                        { value: "I", label: "I" },
                    ],
                },
                {
                    primary: "N",
                    opposite: "S",
                    options: [
                        { value: "N", label: "N" },
                        { value: "S", label: "S" },
                    ],
                },
                {
                    primary: "F",
                    opposite: "T",
                    options: [
                        { value: "F", label: "F" },
                        { value: "T", label: "T" },
                    ],
                },
                {
                    primary: "P",
                    opposite: "J",
                    options: [
                        { value: "P", label: "P" },
                        { value: "J", label: "J" },
                    ],
                },
            ],
            selected: {},
        };
    },
    methods: {
        isSelected(primary, value) {
            return this.selected[primary] === value;
        },
        toggleSelection(primary, value, opposite) {
            if (this.selected[primary] === value) {
                this.selected[primary] = "";
            } else {
                const selectedCount = Object.values(this.selected).filter(
                    (value) => value !== "",
                ).length;

                if (selectedCount < 4 || this.selected[primary] !== "") {
                    this.selected[primary] =
                        this.selected[primary] === value ? "" : value;
                    this.selected[opposite] = "";
                }
            }

            let mbtiType = "";
            const mbtiOrder = ["E", "I", "N", "S", "F", "T", "P", "J"];

            for (const trait of mbtiOrder) {
                mbtiType += this.selected[trait] || "";
            }

            this.$emit("update:mbtiType", mbtiType);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";
.selected {
    background: $vc-indigo-500;
    color: $vc-white;
    border-radius: $border-radius-default;
    font-family: $font-bold;
}

.mbti-box {
    display: flex;
    font-size: 2rem;

    .mbti-pair {
        width: 54px;
        background: $vc-indigo-50;
        color: $vc-gray-400;
        border-radius: $border-radius-default;
        margin-right: 2rem;
        transition: all 0.4s;

        div {
            width: 100%;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
