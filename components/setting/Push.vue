<template>
  <div class="push-title-div">
    <span class="push-title">PUSH 알림 설정</span>
  </div>
  <div class="push-content-1">
    <div class="push-content-1-div">
      <span class="push-content-1-title">아침 시간대 기록 알림</span>
      <span class="push-content-1-content">오전 8시에 PUSH로 기록 리마인드 알림을 받아요.</span>
    </div>
    <div class="push-content-1-switch-div">
      <v-switch
          class="push-content-1-switch"
          v-model="user.push_morning"
          @change="updatePushMorning"
      />
    </div>
  </div>
  <div class="push-content-2">
    <div class="push-content-2-div">
      <span class="push-content-2-title">밤 시간대 기록 알림</span>
      <span class="push-content-2-content">오후 8시에 PUSH로 기록 리마인드 알림을 받아요.</span>
    </div>
    <div class="push-content-2-switch-div">
      <v-switch class="push-content-2-switch"
          v-model="user.push_night"
          @change="updatePushNight"
      />
    </div>
  </div>
  <div class="push-content-3">
    <div class="push-content-3-div">
      <span class="push-content-3-title">한 주 돌아보기 알림</span>
      <span class="push-content-3-content">한 주 돌아보기가 완성되었을때 알림을 보내드려요.</span>
    </div>
    <div class="push-content-3-switch-div">
      <v-switch class="push-content-3-switch"
                v-model="user.push_report"
                @change="updatePushReport"
      />
    </div>
  </div>
</template>

<script>
import {mapState} from "pinia";
import {useUserStore} from "~/store/user";
import {useSettingService} from "~/services/setting";

export default {
  name: "Push",
  computed: {
    ...mapState(useUserStore, ["user"]),
  },
  methods: {
    openErrorModal(message) {
      console.log(message)
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
    async updatePushMorning() {
      const { updatePushSetting } = useSettingService();
      const res = await updatePushSetting("morning", this.user.push_morning);
      if (!res.success) {
        this.openErrorModal(res.message);
      }
    },
    async updatePushNight() {
      const { updatePushSetting } = useSettingService();
      const res = await updatePushSetting("night", this.user.push_night);
      if (!res.success) {
        this.openErrorModal(res.message);
      }
    },
    async updatePushReport() {
      const { updatePushSetting } = useSettingService();
      const res = await updatePushSetting("report", this.user.push_report);
      if (!res.success) {
        this.openErrorModal(res.message);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
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
  margin-top: 12px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 12px;
}
.push-content-1-div {
  flex-direction: column;
}
.push-content-1-title, .push-content-2-title, .push-content-3-title {
  color: var(--gray-600, #4B5563);
  font-family: Pretendard;
  font-size: 16px;
  line-height: 160%;
}
.push-content-1-content, .push-content-2-content, .push-content-3-content {
  position: relative;
  display: flex;
  color: var(--gray-400, #9CA3AF);
  font-family: Pretendard;
  font-size: 12px;
  line-height: 160%;
}
.push-content-1-switch, .push-content-2-switch, .push-content-3-switch {
  position: relative;
}
.push-content-1-switch-div, .push-content-2-switch-div, .push-content-3-switch-div {
  position: relative;
  align-items: center;
}
::v-deep .v-selection-control v-selection-control--density-default {
  position: relative;
  align-items: center;
}
::v-deep .v-selection-control--density-default {
  --v-selection-control-size: none !important;
}
::v-deep .v-selection-control__wrapper {
  display: flex !important;
  align-items: center !important;
}
::v-deep .v-switch .v-selection-control {
  min-height: var(--v-input-control-height);
  display: flex !important;
  justify-content: flex-end !important;
}
::v-deep .v-switch__thumb {
  background-color: white !important;
  width: 20px;
  height: 20px;
  box-shadow: none !important;
  outline: none !important;
  border: none !important;
}
::v-deep .v-switch--selected .v-switch__thumb,
::v-deep .v-switch--active .v-switch__thumb {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
}
::v-deep .v-input__details, ::v-deep .v-messages {
  min-height: 0 !important;
  padding-top: 0 !important;
}
::v-deep .v-switch__track {
  background-color: #6366F1 !important;
  width: 44px;
  height: 24px;
  border-radius: 12px;
}
::v-deep .v-selection-control:not(.v-selection-control--dirty) .v-switch__track {
  background-color: #D1D5DB !important; // 비활성 상태의 배경색
}
</style>