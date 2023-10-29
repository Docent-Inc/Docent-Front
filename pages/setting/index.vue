<template>
  <div class="header">
    <div class="setting-top">
      <v-icon class="ic_back" @click="this.$router.back()" />
      <span class="setting-title">설정</span>
    </div>
  </div>
  <div class="contents">
    <div class="setting-contents-1">
      <div class="setting-contents-1-top">
        <span class="setting-nickname">{{ user?.nickname }}</span>
        <v-icon class="ic_profile_setting" />
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
          <span class="birth-content">2002년 02월 24월</span>
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
          <v-icon class="ic_kakao_logo" />
        </div>
        <span class="logout">로그아웃</span>
      </div>
    </div>
    <div class="setting-contents-3">
      <div class="push-title-div">
        <span class="push-title">PUSH 알림 설정</span>
      </div>
      <div class="push-content-1">
        <div class="push-content-1-content">
          <span class="push-content-1-title">채팅</span>
          <v-switch class="push-content-1-switch" />
        </div>
      </div>
      <div class="push-content-2">

      </div>
      <div class="push-content-3">

      </div>
    </div>
    <div class="setting-contents-4">

    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from "pinia";
import {useUserStore} from "~/store/user";

export default {
  name: "setting",
  setup() {
  },
  data() {
    return {
      maxWidth: 214,
    };
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
  },
}
</script>

<style lang="scss" scoped>
.header {
  padding: 2rem 2.5rem 2rem 2.5rem;
}
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
  color: var(--gray-800, #1F2937);
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
  padding: 0 2.35rem;
}
.setting-contents-1 {
  position: relative;
  top: 0;
  margin-left: -2.35rem;
  width: 100vw;
  height: 170px;

  flex-shrink: 0;
  background: linear-gradient(183deg, #DED2FF -94.64%, #D2DAFF -73.59%, #DEE4FF -36.86%, #FFF 135.27%);
}
.setting-contents-1-top {
  top: 20px;
  position: relative;
  margin-right: 2.35rem;
  margin-left: 2.35rem;
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
  margin-right: 2.35rem;
  margin-left: 2.35rem;
  display: flex;
}
.setting-mbti {
  position: relative;
  color: var(--indigo-500, #6366F1);
  font-family: Pretendard;
  font-size: 16px;
  line-height: 160%;
}
.setting-content-1-bottom {
  position: relative;
  top: 40px;
  margin-right: 2.35rem;
  margin-left: 2.35rem;
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
.gender, .birth {
  color: var(--gray-500, #6B7280);
  font-family: Pretendard;
  font-size: 14px;
  line-height: 160%;
}
.setting-contents-2 {
  position: relative;
  width: 100%;
  height: 138px;
}
.account-info-title-div {
  position: relative;
  margin-top: 32px;
}
.account-info-title {
  position: relative;
}
.account-info {
  color: var(--gray-500, #6B7280);
  font-family: Pretendard;
  font-size: 16px;
  line-height: 160%;
}
.ic_kakao_logo {
  position: relative;
  width: 32px;
  height: 32px;
}
.account-info-div {
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
  color: var(--gray-400, #9CA3AF);
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  line-height: 160%;
}
.setting-contents-3 {
  position: relative;
  height: 291px;
}
.push-title-div {
  position: relative;
  margin-bottom: 12px;
}

.push-title {
  color: var(--gray-600, #4B5563);
  font-family: "Pretendard Medium";
  font-size: 18px;
  line-height: 160%;
}

.push-content-1, .push-content-2, .push-content-3 {
  position: relative;
  width: 350px;
  height: 78px;
  border-radius: 8px;
  background: var(--indigo-50, #EEF2FF);
}

.push-content-1 {
  margin-top: 12px;
}

</style>