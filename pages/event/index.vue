<template>
  <div class="header">
    <div class="header-title-box">
      <span class="header-title">Looi의 꿈 해석 체험하기</span>
    </div>
    <v-icon :class="iconClass" @click="send" />
  </div>
  <div class="contents">
    <div v-if="isLoading" class="loading-video">
      <div class="contents-header">
        <span class="contents-header-title">
            <span lang="ko">Looi가 꿈을 분석하고 있어요! 잠시만 기다려 주세요</span>
        </span>
      </div>
      <video autoplay loop muted playsinline>
        <source src="./event_demo.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <div v-else class="contents-body">
    <div class="contents-title-box">
      <span class="contents-title">최근 꿈으로 보는 나의 심리 상태</span>
    </div>
    <div class="contents-icon-box">
      <v-icon class="ic_event" />
    </div>
    <div class="contents-subtitle-box">
      <span class="contents-subtitle">오늘 꾸었던 꿈이나<br>최근에 꾼 꿈을 입력해주세요!</span>
    </div>

    <div class="contents-input-box-div">
      <textarea
          class="contents-input-box"
          placeholder="꿈 내용을 자세히 입력할수록 정확한 해석과 그림이 제공됩니다 :)"
          v-model="data"
          maxlength="1000"
          :class="{ warn: data.length === 1000 }"
      />
      <div
          class="character-count"
          :class="{ warn: data.length === 1000 }"
      >
        {{ data.length }} / {{ 1000 }} 자
      </div>
    </div>
    </div>
  </div>
</template>
<script setup>
useServerSeoMeta({
  title: () => "헉, 이 꿈 이런 뜻이였어?",
  description: () => "최근 꿈으로 보는 나의 심리 상태",
  ogImage: () => "https://kr.object.ncloudstorage.com/looi/event_page_002.png",
  ogTitle: () => "헉, 이 꿈 이런 뜻이였어?",
  ogDescription: () => "최근 꿈으로 보는 나의 심리 상태",
  twitterTitle: () => "헉, 이 꿈 이런 뜻이였어?",
  twitterDescription: () => "헉, 이 꿈 이런 뜻이였어?",
});
</script>
<script>
import {useDiaryService} from "../../services/diary";
import { useUserStore } from "~/store/user";

export default {
  name: "event",
  data() {
    return {
      data: "",
      LIMITED_CONTENT_LENGTH: 1000,
      isLoading: false,
    };
  },
  setup() {},
  methods: {
    async send() {
      if (this.isLoading){
        return;
      }
      if (!this.isValidate.status) {
        this.$eventBus.$emit("onConfirmModal", {
          title: this.isValidate.msg,
        });
        return;
      }
      const { setAccessToken  } = useUserStore();
      setAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0d2NobzAyMDVAZ21haWwuY29tIiwiZXhwIjoxNDMwMDk4MDQ3Mn0._7CobpeILug91YsayMUsGONO2oddYYpUIpL7hNSuw08");
      const { postMorningDiary } = useDiaryService();
      const data = {
        content: this.data,
      };
      this.isLoading = true;
      this.data = "";
      const res = await postMorningDiary(data);
      if (res.success) {
          this.$router.push(
              `/event/${res.data.diary.id}?shared=false`,
          )
      }
      else {
        this.isLoading = false;
        this.$eventBus.$emit("onConfirmModal", {
          title: "꿈 해석 생성에 실패했습니다.",
          desc: res.message,
        });
      }
    },
  },
  computed: {
    iconClass() {
      return this.data.length > 10 ? 'ic_send_on' : 'ic_send_off';
    },
    isValidate() {
      if (!this.data || this.data === "")
        return {
          status: false,
          msg: "내용을 입력해 주세요.",
        };

      if (this.data.length < 10)
        return {
          status: false,
          msg: `${10}자 이상 입력해 주세요.`,
        };

      if (this.data.length > 1000)
        return {
          status: false,
          msg: `${1000}자까지 입력 가능합니다.`,
        };

      return {
        status: true,
        msg: "",
      };
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.header {
  height: 48px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 17px;
  display: flex;
  justify-content: space-between;
  align-items: center;

}
.header-title-box{

}
.header-title{
  color: var(--gray-800, #1F2937);
  font-family: "Pretendard SemiBold";
  font-size: 16px;
}
.contents {
  background: linear-gradient(172deg, #DED2FF -9.22%, #D2DAFF -4.2%, #DEE4FF 4.56%, #FFF 44.81%);
  width: 100%;
  height: calc(100% - (48px));
  height: calc(100% - (48px + constant(safe-area-inset-top)));
  height: calc(100% - (48px + env(safe-area-inset-top)));

  margin-top: 48px;
  margin-top: calc(48px + constant(safe-area-inset-top));
  margin-top: calc(48px + env(safe-area-inset-top));
  position: relative;
  justify-content: center;
  overflow: auto;
}
.contents-title-box{
  margin-top: 30px;
  justify-content: center;
  display: flex;
}
.contents-title {
  color: var(--gray-700, #374151);
  font-family: "Pretendard Bold";
  font-size: 24px;
}
.contents-icon-box {
  margin-top: 37px;
  justify-content: center;
  display: flex;
}
.contents-subtitle-box {
  margin-top: 33px;
  justify-content: center;
  display: flex;
}
.contents-subtitle {
  text-align: center;
  color: var(--gray-700, #374151);
  font-family: "Pretendard Medium";
  font-size: 16px;
}
.ic_send_off {
  width: 115px;
  height: 31px;
}
.ic_send_on {
  width: 115px;
  height: 31px;
}

.ic_event {
  width: 156px;
  height: 156px;
}
.contents-input-box-div{
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 10px;
  height: calc(100% - (402px)) !important;
  height: calc(100% - (402px + constant(safe-area-inset-top))) !important;
  height: calc(100% - (402px + env(safe-area-inset-top))) !important;
}
.contents-input-box {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: var(--indigo-50, #EEF2FF);
  display: inline-flex;
  padding: 8px 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  resize: none;
  position: relative;
}
.character-count {
  text-align: right;
}
.character-count {
  width: 100%;
  text-align: right;
  color: $vc-gray-500;
  font-size: 0.8em;

  &.warn {
    color: $vc-red-500;
  }
}
.loading-video {
   height: 100%;
   width: 100%;
   background-color: white; // 배경색
    overflow: auto;

   video {
     position: absolute;
     overflow: auto;
     margin-top: 48px;
     width: 100%;
   }
 }
.contents-header {
  width: 100%;
  height: 48px;
  position: absolute;
  flex-shrink: 0;
  object-fit: contain;
  background: var(--indigo-100, #E0E7FF);
  align-items: center !important;
}
.contents-header-title {
  height: 100%;
  align-items: center !important;
  justify-content: center;
  display: flex;
  color: var(--indigo-600, #4F46E5);
  /* b2/b2_med_14 */
  font-family: "Pretendard Medium";
  font-size: 14px;
}
.contents-header-title span[lang="en"] {
  font-family: "Pretendard Bold";
}
.contents-body {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>