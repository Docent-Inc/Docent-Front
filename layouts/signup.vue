<template>
    <div class="viewport">
        <div class="header">
            <BackBtn />
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
import BackBtn from "~/components/common/buttons/BackBtn.vue";

export default {
    name: "SignupLayout",
    components: { BackBtn },
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
<style lang="scss" scoped>
.contents {
    width: 100%;
    height: calc(100% - 60px);
    margin-top: 60px;
    padding: 3rem 2rem 0 2rem;
    position: relative;
}
</style>
