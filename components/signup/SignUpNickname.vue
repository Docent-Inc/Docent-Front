<template>
    <div>
        <input
            id="nickname"
            v-model="nickname"
            class="nickname-input"
            @input="checkNickname"
            placeholder="닉네임은 6자 이내로 입력해주세요."
        />
        <div class="feedback" v-if="showFeedback">{{ feedbackMessage }}</div>
    </div>
</template>

<script>
export default {
    name: "SignUpNickname",
    data() {
        return {
            nickname: "",
            showFeedback: false,
            feedbackMessage: "",
        };
    },
    methods: {
        checkNickname() {
            if (this.nickname.length > 6) {
                this.nickname = this.nickname.slice(0, 6);
            }

            if (this.nickname.length >= 1) {
                this.showFeedback = true;
                this.feedbackMessage = "멋진 이름이네요!";
            } else {
                this.showFeedback = false;
            }
            this.$emit("update:nickname", this.nickname);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";
.nickname-input {
    width: 100%;
    height: 48px;
    font-size: 1.4rem;
    background: $vc-indigo-50;
    border-radius: $border-radius-default;
    padding-left: 1.2rem;
    margin-bottom: 0.5rem;
    color: $vc-gray-700;

    &::placeholder {
        color: $vc-gray-400;
    }

    &:focus {
        border: 1px solid $vc-indigo-400;
        background: $vc-indigo-100;
    }
}

.feedback {
    color: $vc-indigo-600;
    font-size: 1.4rem;
    font-family: $font-medium;
}
</style>
