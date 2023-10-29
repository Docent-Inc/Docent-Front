<template>
  <p class="top">아직 기록이 없어요!<br>looki에게 오늘 하루를 들려주세요.</p>
  <p class="middle">어제밤 꾼 꿈이든 오늘의 기분이든<br>기억할 일들이든 모두 상관 없답니다 :)</p>
  <div class="button-container">
    <v-btn flat @click="navigateTo(`/chat`)">
      <v-icon class="ic_new_chat" />
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Starter"
}
</script>

<style scoped>
.top {
  display: flex;
  width: 256px;
  height: 52px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #6B7280;
  text-align: center;

  font-family: "Pretendard Medium";
  font-size: 16px;
  line-height: 160%;
  margin-top: 84px;
  margin-left: auto;
  margin-right: auto;
}
.middle {
  display: flex;
  width: 292px;
  height: 42px;
  flex-direction: column;
  justify-content: center;
  color: #9CA3AF;
  text-align: center;

  font-family: Pretendard;
  font-size: 14px;
  line-height: 160%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 49px;
}
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
.ic_new_chat {
  width: 242px;
  height: 48px;
}
</style>