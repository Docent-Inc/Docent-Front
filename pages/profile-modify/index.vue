<template>
  <div class="header">
    <div class="modify-top">
      <v-icon class="ic_back" v-if="hasChanges" @click="openCustomModal" />
      <v-icon class="ic_back" v-else @click="this.$router.back()" />
      <span class="modify-title">프로필 편집하기</span>
    </div>
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
      <div
          class="modify-nickname-content"
          :class="{editable: isEditable}"
          @blur="nicknameBlur"
      >
        <input
            type="text"
            v-model="nickname"
            :readonly="!isEditable"
            class="nickname-input"
            :placeholder="nickname">
        <v-icon class="ic_modify" @click="toggleEdit" />
      </div>
    </div>
    <ModifyMbti @mbtiSelected="onMbtiSelected" />
    <ModifyGender @genderSelected="onGenderSelected" />
    <ModifyBirth @birthSelected="onBirthSelected" />
    <div class="modify_save">
      <v-icon v-if="isDataChanged" class="ic_modify_save_on" @click="saveChanges" />
      <v-icon v-else class="ic_modify_save_off" />
    </div>
  </div>
</template>

<script>
import {mapState} from "pinia";
import {useUserStore} from "~/store/user";
import ModifyMbti from "~/components/profile-modify/ModifyMbti.vue";
import ModifyGender from "~/components/profile-modify/ModifyGender.vue";
import ModifyBirth from "~/components/profile-modify/ModifyBirth.vue";
import {useSettingService} from "~/services/setting";
import Toast from "~/components/common/Toast.vue";

export default {
  name: "profile-modify",
  components: {ModifyBirth, ModifyGender, ModifyMbti, Toast},
  data() {
    return {
      nickname: "",
      gender: "",
      mbti: "",
      birth: "",
      isDataChanged: false,
      isEditable: false,
      isSuccess: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    hasChanges() {
      console.log("hasChanges computed:", this.isDataChanged);
      return this.isDataChanged;
    },
  },
  mounted() {
    this.nickname = this.user.nickname;
    this.mbti = this.user.mbti;
    this.birth = this.user.birth;
    this.gender = this.user.gender;
  },
  methods: {
    close() {
      this.isSuccess = false;
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
    toggleEdit() {
      this.isEditable = !this.isEditable;
    },
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
    nicknameBlur() {
      this.toggleEdit();
      this.onNicknameChange();
    },
    async saveChanges() {
      const { updateAccount } = useSettingService();
      this.isDataChanged = false;
      console.log(this.birth);
      const data = {
        nickname: this.nickname,
        mbti: this.mbti,
        gender: this.gender,
        birth: this.birth,
      };
      const res = await updateAccount(data);
      if (res) {
        this.isSuccess = true;
        await this.userStore.setUser();
      }
    }
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 0.8rem 2rem 0.8rem 2rem;
  height: 48px;
}
.modify-top {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.modify-title {
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

  margin-top: 48px;
  margin-top: calc(48px + constant(safe-area-inset-top));
  margin-top: calc(48px + env(safe-area-inset-top));
  position: relative;
  padding: 0 2rem;
  min-height: 100vh;
  max-height: 100vh;
  overflow-y: auto;
}
.modify-nickname-div {
  margin-top: 40px;
}
.modify-nickname-content {
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  background: var(--indigo-50, #EEF2FF);
  color: var(--gray-700, #374151);
  font-family: "Pretendard";
  font-size: 14px;
  line-height: 160%;
  border: 1px solid transparent;

  &.editable {
    border-color: var(--indigo-400, #6568FE);
  }
  .nickname-input {
    flex-grow: 1;
    height: 48px;
    border-radius: 8px;
    border: none;
    margin-left: 12px;
  }
  .ic_modify {
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin-right: 12px;
  }
}
.modify_save {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 2rem;
}

.ic_modify_save_on,
.ic_modify_save_off {
  width: 350px;
  height: 48px;
  margin-bottom: 20px;
}

.notification {
  position: fixed;
  margin-top: 16px;
  width: 350px;
  height: 40px;
  z-index: 1000;
}
.ic_modify_complete {
  width: 350px;
  height: 40px;
  flex-grow: 1;
}

.notification {
  position: fixed;
  margin-top: 16px;
  width: 350px;
  height: 40px;
  z-index: 1000;
  display: flex;
  align-items: center;
}
.notification-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.ok {
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>