<template>
    <div class="push-title-div">
        <span class="push-title">PUSH 알림 설정</span>
    </div>
    <div class="push-content-1">
        <div class="push-content-1-div">
            <span class="push-content-1-title">꿈 기록 알림</span>
            <span class="push-content-1-content"
                >오전 8시에 PUSH로 기록 리마인드 알림을 받아요.</span
            >
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
            <span class="push-content-2-title">일기 기록 알림</span>
            <span class="push-content-2-content"
                >오후 8시에 PUSH로 기록 리마인드 알림을 받아요.</span
            >
        </div>
        <div class="push-content-2-switch-div">
            <v-switch
                class="push-content-2-switch"
                v-model="user.push_night"
                @change="updatePushNight"
            />
        </div>
    </div>
    <div class="push-content-3">
        <div class="push-content-3-top">
            <div class="push-content-3-div">
                <span class="push-content-3-title">일정 미리 알림</span>
                <span class="push-content-3-content"
                    >설정해 놓은 시간에 PUSH로 일정 리마인드 알림을 받아요.</span
                >
            </div>
            <div class="push-content-3-switch-div">
                <v-switch
                    class="push-content-3-switch"
                    v-model="isPushEnabled"
                    @change="updatePushScehdule"
                />
            </div>
        </div>
        <div class="push-content-3-bottom" @click="open">
            <v-icon class="ic_alarm" />
          <span class="push-content-3-bottom-title">일정 시작 시</span>
          <span class="push-content-3-bottom-content">알림 시간을 변경할 수 있어요!</span>
        </div>
    </div>
  <bottom-sheet ref="myBottomSheet" :overlay="true" >
    <div class="bottom-sheet-top">
      <div class="bottom-sheet-title">
        <span>알림 시간 수정하기</span>
        <v-icon class="ic_close" @click="close"/>
      </div>
      <div class="bottom-sheet-body">일정으로부터 얼마나 남았을때 알림을 보내드릴까요?</div>
    </div>
    <div
        v-for="(option, idx) in timeOptions"
        :key="idx"
        class="item"
        :class="{ 'selected': selectedTime === option.value }"
        @click="selectTime(option)"
    >
      {{ option.text }}
      <v-icon v-if="selectedTime === option.value" class="ic_setting_check" />
    </div>
    <div class="bottom-sheet-foot-btn" :class="{ 'active': isChanged }" @click="savePushSchedule" :disabled="!isChanged">
      알림 시간 저장하기
    </div>
  </bottom-sheet>
</template>

<script>
import { mapState } from "pinia";
import { ref } from "vue";
import { useUserStore } from "~/store/user";
import BottomSheet from "../diary/BottomSheet.vue";
import { useSettingService } from "~/services/setting";

export default {
    name: "Push",
    data() {
      return {
        selectedTime: 10,
        time: null,
        timeOptions: [
          { text: "일정 시작 시", value: 0 },
          { text: "5분 전", value: 5 },
          { text: "10분 전", value: 10 },
          { text: "15분 전", value: 15 },
          { text: "30분 전", value: 30 },
          { text: "1시간 전", value: 60 },
          { text: "2시간 전", value: 120 },
          { text: "3시간 전", value: 180 },
        ],
        isChanged: false,
      };
    },
    created() {
      if (this.user && this.user.push_schedule >= 0) {
        this.selectedTime = this.user.push_schedule;
      }
    },
    components: {
        BottomSheet,
    },
    computed: {
      ...mapState(useUserStore, ["user"]),
      selectedTime: {
        get() {
          return this.user && this.user.push_schedule >= 0 ? this.user.push_schedule : 10;
        },
        set(value) {
          this.user.push_schedule = value;
        }
      },
      isPushEnabled: {
        get() {
          // push_schedule이 -1이 아니면 알림이 켜져 있다고 간주합니다.
          return this.user.push_schedule !== -1;
        },
        set(value) {
          // 스위치를 토글하면 push_schedule 값을 변경합니다.
          this.user.push_schedule = value ? 0 : -1;  // 예시로 0을 사용하였으나, 필요에 따라 다른 기본값을 설정할 수 있습니다.
        }
      }
    },
    watch: {
      selectedTime(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.isChanged = true;
        }
      }
    },
    setup() {
      const myBottomSheet = ref(null);
      const { $native } = useNuxtApp();
      return {
          $native,
          myBottomSheet,
      };
    },
    methods: {
        async savePushSchedule() {
          if (!this.isChanged) return;

          const { updatePushSetting } = useSettingService();
          const res = await updatePushSetting("schedule", this.selectedTime);

          if (res.success) {
            this.isChanged = false; // 변경 사항을 저장하고 버튼을 비활성화
            this.user.push_schedule = this.selectedTime; // 사용자 상태 업데이트
          } else {
            this.openErrorModal(res.message);
          }
        },
        selectTime(option) {
          this.selectedTime = option.value;
          this.user.push_schedule = this.selectedTime; // 사용자 상태 업데이트
          this.isChanged = true;
        },
        open() {
            $native.controlSafeArea(true);
            this.$refs.myBottomSheet.open();
        },
        close() {
            $native.controlSafeArea(false); // TODO: safearea 컨트롤 적용 안되는 오류
            this.$refs.myBottomSheet.close();
        },
        openErrorModal(message) {
            // console.log(message);
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
            const res = await updatePushSetting(
                "morning",
                this.user.push_morning,
            );
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
        async updatePushScehdule() {
            const { updatePushSetting } = useSettingService();
            const res = await updatePushSetting(
                "schedule",
                this.user.push_schedule,
            );
            if (!res.success) {
                this.openErrorModal(res.message);
            }
        },
    },
};
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
    color: var(--gray-600, #4b5563);
    font-family: "Pretendard Medium";
    font-size: 18px;
    line-height: 160%;
}

.push-content-1,
.push-content-2 {
    position: relative;
    width: 350px;
    height: 78px;
    border-radius: 8px;
    background: var(--indigo-50, #F9FAFB);
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px;
}
.push-content-3{
    position: relative;
    width: 350px;
    height: 109px;
    border-radius: 8px;
    background: var(--indigo-50, #F9FAFB);
    margin-top: 12px;
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 12px;
}
.push-content-1-div {
    flex-direction: column;
}
.push-content-3-top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
}
.push-content-1-title,
.push-content-2-title,
.push-content-3-title {
    color: var(--gray-600, #4b5563);
    font-family: Pretendard;
    font-size: 16px;
    line-height: 160%;
}
.push-content-1-content,
.push-content-2-content,
.push-content-3-content {
    position: relative;
    display: flex;
    color: var(--gray-400, #9ca3af);
    font-family: Pretendard;
    font-size: 12px;
    line-height: 160%;
}
.push-content-1-switch,
.push-content-2-switch,
.push-content-3-switch {
    position: relative;
}
.push-content-1-switch-div,
.push-content-2-switch-div,
.push-content-3-switch-div {
    position: relative;
    align-items: center;
}

:deep(.v-selection-control .v-selection-control--density-default) {
    position: relative;
    align-items: center;
}

:deep(.v-selection-control--density-default) {
    --v-selection-control-size: none !important;
}

:deep(.v-selection-control__wrapper) {
    display: flex !important;
    align-items: center !important;
}

:deep(.v-switch .v-selection-control) {
    min-height: var(--v-input-control-height);
    display: flex !important;
    justify-content: flex-end !important;
}

:deep(.v-switch__thumb) {
    background-color: white !important;
    width: 20px;
    height: 20px;
    box-shadow: none !important;
    outline: none !important;
    border: none !important;
}

:deep(.v-switch--selected .v-switch__thumb),
:deep(.v-switch--active .v-switch__thumb) {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
}

:deep(.v-input__details),
:deep(.v-messages) {
    min-height: 0 !important;
    padding-top: 0 !important;
}

:deep(.v-switch__track) {
    background-color: #6366f1 !important;
    width: 44px;
    height: 24px;
    border-radius: 12px;
}

:deep(.v-selection-control:not(.v-selection-control--dirty) .v-switch__track) {
    background-color: #d1d5db !important; // 비활성 상태의 배경색
}

.push-content-3-bottom {
  left: 0 !important;
  width: 244px;
  height: 31px;
  display: inline-flex;
  padding: 6px 12px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  background: var(--indigo-100, #E0E7FF);
}
.push-content-3-bottom-content {
  color: var(--indigo-400, #6568FE);
  font-family: "SpoqaHanSansNeo";
  font-size: 11px;
  line-height: 160%; /* 17.6px */
}
.push-content-3-bottom-title {
  color: var(--indigo-500, #6366F1);
  font-family: "Pretendard Bold";
  font-size: 12px;
  line-height: 160%;
}
.ic_alarm {
  min-width: 16px !important;
  width: 16px !important;
  height: 16px !important;
}
.bottom-sheet__draggable-area {
  display: none !important;
}
.bottom-sheet-top {

}
.bottom-sheet-title {
  display: flex;
  justify-content: space-between;
  color: var(--gray-700, #374151);
  font-family: "Pretendard Bold";
  font-size: 20px;
  line-height: 150%;
}
.bottom-sheet-body {
  color: var(--slate-400, #94A3B8);
  font-family: "SpoqaHanSansNeo";
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
  margin-bottom: 20px;
}
.ic_close {
  width: 14px;
  height: 14px;
  min-height: 14px;
  min-width: 14px;
}
.item {
  display: flex;
  width: 100%;
  height: 44px;
  padding-left: 12px;
  padding-right: 12px;
  align-items: center;
  margin-bottom: 4px;
  justify-content: space-between;
  color: var(--slate-600, #475569);
  font-family: "SpoqaHanSansNeo";
  font-size: 16px;
  line-height: 160%; /* 25.6px */
}
.selected {
  border-radius: 8px;
  background: var(--indigo-50, #EEF2FF);
  color: var(--indigo-500, #6366F1);
  font-family: "Pretendard Bold";
  font-size: 16px;
  line-height: 160%; /* 25.6px */
}
.ic_setting_check {
  width: 22px;
  height: 22px;
  min-height: 22px;
  min-width: 22px;
}
.bottom-sheet-foot-btn {
  width: 100%;
  height: 48px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--gray-200, #E5E7EB);
  color: var(--gray-400, #9CA3AF);
  text-align: center;
  font-family: "Pretendard Medium";
  font-size: 16px;
  line-height: 160%; /* 25.6px */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 14px;
}
.bottom-sheet-foot-btn.active {
  border-radius: 12px;
  background: var(--v2-CTA_accent, #9398FF);
  color: var(--white, #FFF);
  text-align: center;
  font-family: "Pretendard Bold";
  font-size: 16px;
  line-height: 160%;
}
</style>
