<template>
    <div class="viewport">
        <div class="header">
            <v-icon class="ic_back" @click="goBack" />
            <span class="modify-title">프로필 편집하기</span>
            <Toast
                v-if="isSuccess"
                @click="isSuccess = false"
                text="변경사항이 반영되었어요!"
                :top="64"
            />
        </div>
        <div class="contents">
            <div class="modify-nickname-div">
                <span class="modify-nickname-title">닉네임</span>
                <div class="modify-nickname-content">
                    <input
                        type="text"
                        v-model="nickname"
                        @input="onNicknameChange"
                        ref="nicknameRef"
                    />
                    <v-icon
                        class="ic_modify"
                        @click="this.$refs.nicknameRef.focus()"
                    />
                </div>
            </div>
            <ModifyMbti @mbtiSelected="onMbtiSelected" />
            <ModifyGender @genderSelected="onGenderSelected" />
            <ModifyBirth
                @birthSelected="onBirthSelected"
                @onStopSubmit="onStopSubmit"
            />
        </div>
        <div
            class="button primary fixed-bottom"
            :class="{ disabled: !isDataChanged }"
            @click="saveChanges"
        >
            변경사항 저장하기
        </div>
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "~/store/user";
import ModifyMbti from "~/components/profile-modify/ModifyMbti.vue";
import ModifyGender from "~/components/profile-modify/ModifyGender.vue";
import ModifyBirth from "~/components/profile-modify/ModifyBirth.vue";
import { useSettingService } from "~/services/setting";
import Toast from "~/components/common/Toast.vue";

export default {
    name: "profile-modify",
    components: { ModifyBirth, ModifyGender, ModifyMbti, Toast },
    setup() {
        const userStore = useUserStore();
        return { userStore };
    },
    data() {
        return {
            nickname: "",
            gender: "",
            mbti: "",
            birth: "",
            isDataChanged: false,
            isSuccess: false,
        };
    },
    computed: {
        ...mapState(useUserStore, ["user"]),
    },
    mounted() {
        this.nickname = this.user.nickname;
        this.mbti = this.user.mbti;
        this.birth = this.user.birth;
        this.gender = this.user.gender;
    },
    methods: {
        onGenderSelected(newGender) {
            if (newGender !== this.user.gender) {
                this.isDataChanged = true;
            }
            this.gender = newGender;
        },
        onMbtiSelected(newMbti) {
            if (newMbti !== this.user.mbti) {
                this.isDataChanged = true;
            }
            this.mbti = newMbti;
        },
        onBirthSelected(newBirth) {
            if (newBirth !== this.user.birth) {
                this.isDataChanged = true;
            }
            this.birth = newBirth;
        },
        onNicknameChange() {
            if (this.nickname !== this.user.nickname) {
                this.isDataChanged = true;
            }
        },
        async saveChanges() {
            const { updateAccount } = useSettingService();
            this.isDataChanged = false;

            const data = {
                nickname: this.nickname,
                mbti: this.mbti,
                gender: this.gender,
                birth: this.birth,
            };
            const res = await updateAccount(data);

            if (res.success) {
                this.isSuccess = true;
                await this.userStore.updateUser();
            } else {
                this.openErrorModal(res.message);
            }
        },
        goBack() {
            if (this.isDataChanged) this.openCustomModal();
            else this.$router.back();
        },
        onStopSubmit(value) {
            this.isDataChanged = value;
        },
        openCustomModal() {
            this.$eventBus.$emit("onCustomModal", {
                title: "프로필 편집을 취소하시겠어요?",
                desc: "저장하지 않은 변경사항이 있어요! 그대로 나가실건가요?",
                cancel: "이어서 편집하기",
                confirm: "편집 나가기",
                callback: () => {
                    this.$router.back();
                },
            });
        },
        openErrorModal(message) {
            this.$eventBus.$emit("onCustomModal", {
                title: "오류가 발생했어요!",
                desc: message,
                cancel: " ",
                confirm: "확인",
                callback: () => {
                    this.setData("");
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.header {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

.modify-title {
    color: var(--gray-800, #1f2937);
    font-family: "Pretendard SemiBold";
    font-size: 16px;
    line-height: 150%;
}
.contents {
    width: 100%;
    height: calc(100% - (60px + 88px));
    height: calc(
        100% -
            (
                60px + 88px + constant(safe-area-inset-top) +
                    constant(safe-area-inset-bottom)
            )
    );
    height: calc(
        100% -
            (
                60px + 88px + env(safe-area-inset-top) +
                    env(safe-area-inset-bottom)
            )
    );

    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));

    margin-bottom: 88px;
    margin-bottom: calc(88px + constant(safe-area-inset-bottom));
    margin-bottom: calc(88px + env(safe-area-inset-bottom));

    position: relative;
    padding: 40px 2rem;

    display: flex;
    flex-direction: column;

    // border: 1px solid red;
}

.modify-nickname-content {
    position: relative;
    margin-top: 8px;

    input {
        width: 100%;
        padding: 13px 12px;
        border-radius: 8px;
        border: 1px solid transparent;
        background: var(--indigo-50, #eef2ff);

        color: var(--gray-700, #374151);
        font-family: "Pretendard";
        font-size: 14px;
        line-height: 160%;
    }

    input:focus {
        border: 1px solid #6568fe;
    }

    .ic_modify {
        cursor: pointer;
        width: 20px;
        height: 20px;
        margin-right: 12px;

        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
    }
}
</style>
