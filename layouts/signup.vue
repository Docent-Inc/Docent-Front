<template>
    <div class="viewport">
        <div class="header">
            <v-icon class="ic_back" @click="goBack" />
        </div>
        <v-progress-linear
            v-model="progress"
            animation-speed="1300"
            height="2"
        ></v-progress-linear>

        <div class="contents">
            <slot />
        </div>
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useSignupStore } from "~/store/signup";
export default {
    name: "SignupLayout",
    data() {
        return {};
    },
    computed: {
        ...mapState(useSignupStore, ["step"]),
        progress() {
            console.log((this.step / 4) * 100);
            return (this.step / 4) * 100;
        },
    },
    methods: {
        goBack() {
            const { setStep } = useSignupStore();
            setStep(this.step - 1);
            this.$router.back();
        },
    },
};
</script>
<style lang="scss">
.contents {
    width: 100%;
    height: 100%;
    margin-top: 60px;
    padding: 3rem 2rem 0 2rem;
    position: relative;
}
</style>
