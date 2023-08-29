<template>
    <div class="title">나이를 알려주세요</div>

    <div class="input-box">
        <div class="title">나이</div>
        <input type="number" v-model="age" @keyup.enter="saveAge" />
    </div>
    <div class="input-box">
        <div class="title">닉네임</div>
        <input type="text" v-model="user.nickname" disabled />
    </div>

    <div class="button" :class="{ disabled: !isValidate }" @click="saveAge">
        다음
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useSignupStore } from "~/store/signup";

export default defineNuxtComponent({
    name: "1-Nickname",
    setup() {
        definePageMeta({
            layout: "signup",
        });
    },
    data() {
        return {
            age: "",
        };
    },
    computed: {
        ...mapState(useSignupStore, ["user"]),
        isValidate() {
            return this.age !== "";
        },
    },
    methods: {
        saveAge() {
            if (!this.isValidate) {
                alert("나이는 1글자 이상이어야 합니다.");
                return;
            }

            const { setAge } = useSignupStore();
            setAge(this.age);
            this.$router.push(`/signup/3-gender`);
        },
    },
});
</script>

<style lang="scss" scoped></style>
