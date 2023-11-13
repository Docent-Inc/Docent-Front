<template>
    <div class="gender-box">
        <div
            :class="{ checked: selectedGender === '남' }"
            @click="selectGender('남')"
        >
            남 <span v-if="selectedGender === '남'">&#10003;</span>
        </div>
        <div
            :class="{ checked: selectedGender === '여' }"
            @click="selectGender('여')"
        >
            여 <span v-if="selectedGender === '여'">&#10003;</span>
        </div>
        <div
            :class="{ checked: selectedGender === '선택안함' }"
            @click="selectGender('선택안함')"
        >
            선택안함 <span v-if="selectedGender === '선택안함'">&#10003;</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "SignUpGender",
    data() {
        return {
            selectedGender: null,
        };
    },
    methods: {
        selectGender(gender) {
            this.selectedGender = gender;
            this.$emit("update:gender", gender);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";
.gender-box {
    width: 100%;
    height: 48px;
    font-size: 1.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:focus {
        border: 1px solid $vc-indigo-400;
        background: $vc-indigo-100;
    }

    div {
        width: 100%;
        height: 100%;
        flex: 1;
        background: $vc-indigo-50;
        border-radius: $border-radius-default;
        color: $vc-indigo-500;
        margin-right: 1.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.2rem;

        &:last-child {
            margin-right: 0;
        }

        &.checked {
            background: $vc-indigo-500;
            color: $vc-white;
            font-family: $font-bold;
        }
    }
}
</style>
