<template>
  <div class="modal" v-if="isModalVisible">
    <div class="modal-backdrop"></div>
    <div class="modal-content">
      <v-icon class="ic_secession_check" />
      <div class="modal-buttons">
        <button class="cancel" @click="cancel"></button>
        <button class="ok" @click="ok"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingSecession",
  data() {
    return {
      isModalVisible: false,
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    cancel() {
      this.closeModal();
    },
    ok() {
      this.closeModal();
    },
  },
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  border-radius: 12px;
  width: 350px;
  height: 155px;
  background: #ffffff;
}
.ic_secession_check {
  width: 100%;
  height: 100%;
}
.modal-buttons {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 12px;
}
.cancel, .ok {
  width: 112px;
  height: 48px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
