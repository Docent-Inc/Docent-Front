<template>
    <v-dialog
        :model-value="visible"
        class="default-modal"
        @update:model-value="closeDialog"
    >
        <v-card>
            <v-card-text>로그인 후 이용하실 수 있습니다.</v-card-text>
            <v-card-actions>
                <v-btn @click="closeDialog">확인</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "LoginModal",
    data() {
        return {
            visible: false,
        };
    },
    created() {
        this.$eventBus.$on("onLoginModal", () => {
            this.visible = true;
        });
    },
    methods: {
        closeDialog() {
            this.visible = false;
            this.$router.push({
                path: "/signin",
                query: { redirectURL: this.$route.path },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.default-modal {
    .v-card {
        background: #ffffff;
        margin: 0 3rem;
        border-radius: 2rem;
        .v-card-text {
            padding: 3rem 0 3.4rem;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 400;
            line-height: 2.2rem;
            letter-spacing: unset;
            max-width: 87%;
            margin: 0 auto;
        }
    }
    .v-btn {
        border-top: 1px solid #eeeeee;
        width: 100%;
        padding: 2.5rem 0;
        font-size: 1.5rem;
        font-weight: 700;
    }
}
</style>
