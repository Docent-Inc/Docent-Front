<template>
  <div class="header">
    <Save ref="modal"/>
    <div class="modify-top">
      <v-icon class="ic_back"  @click="openModal" />
      <span class="modify-title">프로필 편집하기</span>
    </div>
  </div>
  <div class="contents">
    <div class="modify-nickname-div">
      <span class="modify-nickname-title">닉네임</span>
      <div class="modify-nickname-content" :class="{editable: isEditable}">
        <input
            type="text"
            v-model="nickname"
            :readonly="!isEditable"
            class="nickname-input"
            :placeholder="nickname">
        <v-icon class="ic_modify" @click="toggleEdit" />
      </div>
    </div>
    <ModifyMbti />
    <ModifyGender />
    <ModifyBirth />
    <div class="modify_save">
      <v-icon class="ic_modify_save"/>
    </div>
  </div>
</template>

<script>
import {mapState} from "pinia";
import {useUserStore} from "~/store/user";
import ModifyMbti from "~/components/profile-modify/ModifyMbti.vue";
import ModifyGender from "~/components/profile-modify/ModifyGender.vue";
import ModifyBirth from "~/components/profile-modify/ModifyBirth.vue";
import Save from "~/components/profile-modify/Save.vue";

export default {
  name: "profile-modify",
  components: {Save, ModifyBirth, ModifyGender, ModifyMbti},
  data() {
    return {
      nickname: "",
      isEditable: false
    }
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
  },
  mounted() {
    this.nickname = this.user.nickname;
  },
  methods: {
    openModal() {
      this.$refs.modal.openModal();
    },
    toggleEdit() {
      this.isEditable = !this.isEditable;
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  padding: 2rem 2rem 2rem 2rem;
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

  margin-top: 60px;
  margin-top: calc(60px + constant(safe-area-inset-top));
  margin-top: calc(60px + env(safe-area-inset-top));
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

.ic_modify_save {
  width: 350px;
  height: 48px;
  margin-bottom: 20px;
}

</style>