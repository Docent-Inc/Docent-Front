<template>
    <div class="viewport">
        <div class="header">
            <div class="setting-top">
                <BackBtn />
                <span class="setting-title">설정</span>
            </div>
        </div>
        <div class="contents">
            <div class="setting-contents-1">
                <div class="setting-contents-1-top">
                    <span class="setting-nickname">{{ user?.nickname }}</span>
                    <v-icon class="ic_profile_setting" @click="showModify" />
                </div>
                <div class="setting-content-1-middle">
                    <span class="setting-mbti">{{ user?.mbti }}</span>
                </div>
                <div class="setting-content-1-bottom">
                    <div class="setting-content-1-bottom-title">
                        <span class="gender">성별</span>
                        <span class="birth">생년월일</span>
                    </div>
                    <div class="setting-content-1-bottom-contents">
                        <span class="gender-content">{{ user?.gender }}</span>
                        <span class="birth-content">
                            {{ user?.birth ? this.$dayjs(user.birth).format("YYYY년 MM월 DD일") : '' }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="setting-contents-2">
                <div class="account-info-title-div">
                    <span class="account-info-title">계정정보</span>
                </div>
                <div class="account-info-div">
                    <div class="email-and-logo">
                        <span class="account-info">{{ user?.email }}</span>
                        <Icon
                            class="logo_kakao"
                            v-if="user?.Oauth_from === 'kakao'"
                        />
                        <Icon
                            class="logo_line"
                            v-else-if="user?.Oauth_from === 'line'"
                        />
                        <Icon
                            class="logo_apple"
                            v-else-if="user?.Oauth_from === 'apple'"
                        />
                    </div>
                    <span class="logout" @click="logout">로그아웃</span>
                </div>
            </div>
            <div class="setting-contents-3">
                <SettingPush v-if="user" />
            </div>
            <div class="setting-contents-4">
                <div class="inquiry">
                    <span class="inquiry-title">문의하기</span>
                    <v-icon class="ic_kakao_inquiry" @click="openKakaoLink" />
                </div>
                <div class="terms" @click="openToSLink">
                    <span class="terms-title">이용약관</span>
                </div>
                <div class="privacy" @click="openPolicyLink">
                    <span class="privacy-title">개인정보처리방침</span>
                </div>
                <div class="secession" @click="openCustomModal">
                    <span class="secession-title">탈퇴하기</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
const { $native } = useNuxtApp();
import { useUserStore } from "~/store/user";
import { Popover } from "v-calendar";
import Icon from "~/components/common/Icon.vue";
import BackBtn from "~/components/common/buttons/BackBtn.vue";
import { useSettingService } from "../../services/setting";

export default {
    name: "setting",
    components: {
        Popover,
        Icon,
        BackBtn,
    },
    setup() {},
    data() {
        return {
            maxWidth: 214,
            birth: null,
        };
    },
    beforeMount() {
      $native.controlSafeArea(false);
    },
    computed: {
        ...mapState(useUserStore, ["user"]),
    },
    methods: {
        openCustomModal() {
            const { deleteAccount } = useSettingService();
            this.$eventBus.$emit("onCustomModal", {
                title: "정말 탈퇴하시겠어요?",
                desc: "탈퇴하시면 등록된 정보와 기록이 모두 삭제돼요.",
                cancel: "취소하기",
                confirm: "탈퇴하기",
                async callback() {
                    const res = await deleteAccount();
                    // console.log(res);
                    if (!res.success) {
                        alert(res.message);
                    }

                    const { reset } = useUserStore();
                    useCookie("access_token").value = null;
                    useCookie("refresh_token").value = null;
                    reset();
                    if (window) window.localStorage.removeItem("isOnboarding");
                    this.$router.push("/signin");
                },
            });
        },
        showModify() {
            this.$router.push(`/profile/modify`);
        },
        openKakaoLink() {
            window.open("https://pf.kakao.com/_vNxnRG", "_blank");
        },
        openToSLink() {
            window.open(
                "https://docent-ai.notion.site/53a465da1ef04985aabba86fdfb5d388?pvs=4",
                "_blank",
            );
        },
        openPolicyLink() {
            window.open(
                "https://docent-ai.notion.site/bdd51533f0424658ac5c52b4cc067cad?pvs=4",
                "_blank",
            );
        },
        logout() {
            const { reset } = useUserStore();
            useCookie("access_token").value = null;
            useCookie("refresh_token").value = null;
            reset();
            this.$router.push("/signin");
        },
    },
};
</script>

<style lang="scss" scoped>
// .header {
//     padding: 0.8rem 2rem 0.8rem 2rem;
//     height: 48px;
// }
.setting-top {
    display: inline-flex;
    align-items: center;
    gap: 10px;
}
.ic_back {
    width: 32px;
    height: 32px;
}
.setting-title {
    display: flex;
    width: 282px;
    height: 24px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: var(--gray-800, #1f2937);
    font-family: "Pretendard SemiBold";
    font-size: 16px;
    line-height: 150%;
}
.contents {
    width: 100%;
    height: calc(100% - (60px));
    height: calc(100% - (60px + constant(safe-area-inset-top)));
    height: calc(100% - (60px + env(safe-area-inset-top)));

    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));
    position: relative;
}
.setting-contents-1 {
    position: relative;
    top: 0;
    padding: 0 2rem;
    width: 100%;
    height: 170px;

    background: linear-gradient(
        183deg,
        #ded2ff -94.64%,
        #d2daff -73.59%,
        #dee4ff -36.86%,
        #fff 135.27%
    );
}
.setting-contents-1-top {
    top: 20px;
    position: relative;

    display: flex;
    justify-content: space-between;
}
.setting-nickname {
    color: var(--gray-700, #374151);
    font-family: "Pretendard Bold";
    font-size: 24px;
    line-height: 150%;
}
.ic_profile_setting {
    display: flex;
    width: 124px;
    height: 31px;
    padding: 6px 12px 5px 8px;
    align-items: flex-start;
    gap: 8px;
    flex-shrink: 0;

    border-radius: 8px;
}
.setting-content-1-middle {
    position: relative;
    top: 20px;

    display: flex;
}
.setting-mbti {
    position: relative;
    color: var(--indigo-500, #6366f1);
    font-family: Pretendard;
    font-size: 16px;
    line-height: 160%;
}
.setting-content-1-bottom {
    position: relative;
    top: 40px;

    display: flex;
    flex-direction: column;
    justify-content: center;
}
.setting-content-1-bottom-title {
    display: flex;
    gap: 49px;
}
.setting-content-1-bottom-contents {
    display: flex;
    gap: 59px;
}
.gender,
.birth {
    color: var(--gray-500, #6b7280);
    font-family: Pretendard;
    font-size: 14px;
    line-height: 160%;
}
.setting-contents-2 {
    position: relative;
    width: 100%;
    height: 138px;
    padding: 0 2rem;
}
.account-info-title-div {
    position: relative;
    margin-top: 32px;
}
.account-info-title {
    position: relative;
}
.account-info {
    color: var(--gray-500, #6b7280);
    font-family: Pretendard;
    font-size: 16px;
    line-height: 160%;
}
.logo_kakao {
    position: relative;
    width: 32px;
    height: 32px;
}
.account-info-div {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.email-and-logo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logout {
    position: relative;
    color: var(--gray-400, #9ca3af);
    text-align: right;
    font-family: Pretendard;
    font-size: 14px;
    line-height: 160%;
    cursor: pointer;
}

.setting-contents-3 {
    padding: 0 2rem;
}
.setting-contents-4 {
    position: relative;
    margin-top: 48px;
    height: 299px;
    padding: 0 2rem;
}
.inquiry {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.inquiry-title,
.terms-title,
.privacy-title {
    color: var(--gray-700, #374151);
    font-family: Pretendard;
    font-size: 16px;
    line-height: 160%;
}
.ic_kakao_inquiry {
    display: flex;
    width: 152px;
    height: 32px;
}
.terms,
.privacy,
.secession {
    position: relative;
    margin-top: 32px;
    display: flex;
}
.secession-title {
    color: var(--gray-400, #9ca3af);
    font-family: Pretendard;
    font-size: 16px;
    line-height: 160%;
}
</style>
