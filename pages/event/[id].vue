<template>
  <section class="viewport">
    <header class="header">
        <Icon class="ic_url" @click="shareURL"/>
    </header>

    <article class="contents" :class="{'contents-shared': shared}">
      <div class="contents-header">
        <span class="contents-header-title">
            <span lang="ko">Looi의 꿈 해석 하러가기&nbsp;</span>
            <span lang="en">https://look-i.app</span>&nbsp;검색
        </span>
      </div>
<!--      <v-icon class="ic_event_header" />-->
      <!-- 1. 상단 영역 (날짜, 제목) -->
      <div class="diary-title-box">
        <div v-if="isLoading">

        </div>
        <div v-else>
          <div class="diary-title-box-header">
            <div class="diary-date">
              {{ $dayjs(diary.create_date).format("YYYY.MM.DD") }}
            </div>
            <div
                class="diary-delete"
                @click="onDelete"
            >
            </div>
          </div>

          <div class="diary-title">
            <input
                class="edit-input"
                ref="inputRef"
                v-if="isEditMode && editType === 'title'"
                v-model="diaryTitle"
                @blur="handleBlur('title')"
            />
            <div v-else>{{ diaryTitle || diary.diary_name }}</div>
          </div>

          <div class="tag-wrap">
            <div class="tag accent" v-for="tag in diary.keyword">
              {{ tag }}
            </div>
          </div>
        </div>
      </div>

      <!-- 2. 중간 영역 (이미지, 삭제 버튼) -->
      <!-- maxWidth="calc((100vh - (60px + 20px)) * 0.6)" -->
      <Image
          class="diary-image"
          :url="diary.image_url"
          width="calc(100% - 40px)"
          maxWidth="400px"
      />

      <!-- 3. 바텀시트 영역 -->
      <div class="bottom-container">
        <div class="bottom-diary">
          <div class="bottom-diary-content">
            <div class="bottom-diary-content-title">
              <Icon class="ic_memo" />
              <span v-if="type === '1'">꿈 내용</span>
              <span v-else>일기 내용</span>
            </div>
            <div
                class="bottom-diary-content-desc"
            >
                            <textarea
                                class="edit-input content"
                                ref="inputRef"
                                v-if="isEditMode && editType === 'content'"
                                v-model="diaryContent"
                                @blur="handleBlur('content')"
                            />
              <LimitedLength
                  :content="diaryContent"
                  :limitedContentLength="1000"
                  :diary="diary"
                  v-if="isEditMode && editType === 'content'"
                  @update:content="diaryContent = $event"
              />
              <div
                  v-else-if="diaryContent || diary.content"
                  v-html="
                                    diaryContent
                                        ? escapeHtml(diaryContent).replace(
                                              /\n/g,
                                              '<br>',
                                          )
                                        : escapeHtml(diary.content).replace(
                                              /\n/g,
                                              '<br>',
                                          )
                                "
              ></div>
            </div>
          </div>

          <div v-if="type == 1" class="bottom-diary-content">
            <div class="bottom-diary-content-title">
              <Icon class="ic_crystal" />꿈을 통해 본 사용자님의 마음
            </div>

            <div class="bottom-diary-content-desc">
              {{ diary.resolution }}
            </div>
          </div>
        </div>
      </div>
    </article>

    <!-- 토스트 -->
    <Toast
        v-if="isVisible"
        @click="isVisible = false"
        :text="successMessage"
        :top="60"
    />
  </section>
  <div v-if="shared === 'true'" class="bottom-blur">
    <v-icon class="ic_start" @click="start"/>
  </div>
  <div v-if="shared === 'false'" class="bottom-blur">
    <v-icon class="ic_event_down_2" @click="goOther"/>
    <v-icon class="ic_event_down_1" @click="goSave"/>
  </div>
</template>
<script setup>
import { useRecordStore } from "~/store/record";
import { useDiaryService } from "../../services/diary";
const { getMorningdiary } = useDiaryService();
const { setAccessToken  } = useUserStore();
setAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0d2NobzAyMDVAZ21haWwuY29tIiwiZXhwIjoxNDMwMDk4MDQ3Mn0._7CobpeILug91YsayMUsGONO2oddYYpUIpL7hNSuw08");
const router = useRouter();
const route = useRoute();

const params = route.params;
const query = route.query;

const record = await useAsyncData(`content-${params.id}`, async () => {
  const res = await getMorningdiary(params.id)

  if (res.success) {
    return res.data?.diary || null;
  } else {
    // 실패 처리
    return null;
  }
});

useServerSeoMeta({
  title: () => record.data.value?.diary_name,
  description: () => record.data.value?.content,
  ogImage: () => "https://kr.object.ncloudstorage.com/looi/event_page_001.png",
  ogTitle: () => record.data.value?.diary_name,
  ogDescription: () => record.data.value?.content,
  twitterTitle: () => record.data.value?.diary_name,
  twitterDescription: () => record.data.value?.diary_name,
});
</script>
<script>
import { mapState, mapActions } from "pinia";
import { useUserStore } from "~/store/user";
import { useRecordStore } from "~/store/record";
// import { isIOS } from "~/utils/utils";
import { escapeHtml } from "~/utils/utils";

import { useDiaryService } from "../../services/diary";
import Button from "~/components/common/Button.vue";
import Icon from "~/components/common/Icon.vue";
import Image from "~/components/common/Image.vue";
import Toast from "~/components/common/Toast.vue";
import LimitedLength from "~/components/common/LimitedLength.vue";

export default {
  name: "event",
  components: {
    Button,
    Icon,
    Image,
    Toast,
    LimitedLength,
  },
  data() {
    return {
      diary: {},
      type: "1",
      isLoading: true,
      isOpen: false,
      // 수정
      isEditMode: false,
      editType: "",
      diaryTitle: "",
      diaryContent: "",
      // 토스트
      isVisible: false,
      successMessage: "",
      shared: true,
    };
  },
  computed: {
    ...mapState(useUserStore, ["user"]),
    bottomSheetTitle() {
      let type = this.type === "1" ? "꿈 해석" : "일기";
      if (this.type === "2" && !this.isOpen) type = "일기 자세히"; // 일기의 경우, '자세히' 보기

      const open = !this.isOpen ? "보기" : "닫기";

      return `${type} ${open}`;
    },
  },
  async mounted() {
    const { setAccessToken  } = useUserStore();
    setAccessToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0d2NobzAyMDVAZ21haWwuY29tIiwiZXhwIjoxNDMwMDk4MDQ3Mn0._7CobpeILug91YsayMUsGONO2oddYYpUIpL7hNSuw08");

    const { getMorningdiary } = useDiaryService();

    const id = this.$route.params.id;
    this.shared = this.$route.query.shared;
    console.log('shared value:', this.shared);
    const type = "1";

    const res =
        type === "1" ? await getMorningdiary(id) : await getNightdiary(id);

    if (!res.success) {
      this.$eventBus.$emit("onConfirmModal", {
        title: "조회 실패하였습니다.",
        desc: res.message,
        callback: () => {
          this.$router.back();
        },
      });
    }

    this.diary = res.data.diary;
    if (type == 1) this.diary.keyword = JSON.parse(this.diary.main_keyword);
    this.isLoading = false;
  },
  methods: {
    ...mapActions(useRecordStore, ["deleteOptimisticRecord"]),
    setSeoMeta(diary) {
      useSeoMeta({
        title: diary.diary_name,
        ogTitle: diary.diary_name,
        ogDescription: diary.content,
      });
    },
    onDelete() {
      this.$eventBus.$emit("onCustomModal", {
        title: "정말 이 기록을 삭제하시겠어요?",
        desc: "삭제한 기록은 영영 돌아오지 않아요!",
        confirm: "삭제하기",
        cancel: "남겨두기",
        callback: this.deleteDiary,
      });
    },
    async deleteDiary() {
      const { deleteMorningdiary, deleteNightdiary } = useDiaryService();

      const res =
          this.type === "1"
              ? await deleteMorningdiary(this.diary.id)
              : await deleteNightdiary(this.diary.id);

      if (res.success) {
        // 성공 시, 리스트 페이지로 이동
        this.$eventBus.$emit("onConfirmModal", {
          title: "삭제되었습니다.",
          callback: () => {
            this.$router.back();
          },
        });
        this.deleteOptimisticRecord(this.diary);
      } else {
        // 실패 시, 문구 띄우고 새로고침
        this.$eventBus.$emit("onConfirmModal", {
          title: "삭제에 실패하였습니다.",
          desc: res.message,
        });
      }
    },
    async start() {
      this.$router.push(
          `/event`,
      )
    },
    async goSave() {
      if(isIOS) {
        const url = "https://apps.apple.com/kr/app/looi-%EC%9E%90%EA%B8%B0%EA%B4%80%EB%A6%AC%EB%A5%BC-%EB%8F%84%EC%99%80%EC%A3%BC%EB%8A%94-ai-%EA%B8%B0%EB%A1%9D-%EB%B9%84%EC%84%9C/id6474598684?l=en-GB";
        window.open(url, "_blank");
      }
      if(isAndroid) {
        const url = "https://play.google.com/store/apps/details?id=zip.docent.looi";
        window.open(url, "_blank");
      }
    },
    async goOther() {
      if(isIOS) {
        const url = "https://apps.apple.com/kr/app/looi-%EC%9E%90%EA%B8%B0%EA%B4%80%EB%A6%AC%EB%A5%BC-%EB%8F%84%EC%99%80%EC%A3%BC%EB%8A%94-ai-%EA%B8%B0%EB%A1%9D-%EB%B9%84%EC%84%9C/id6474598684?l=en-GB";
        window.open(url, "_blank");
      }
      if(isAndroid) {
        const url = "https://play.google.com/store/apps/details?id=zip.docent.looi";
        window.open(url, "_blank");
      }
    },
    async shareURL() {
      const url = window.location.href;
      // "https://docent.zip/share/${this.diary.id}?type=${this.type}"

      try {
        if (!navigator?.clipboard?.writeText)
          throw new Error(
              "복사 기능이 제공되지 않는 브라우저입니다.",
          );

        // 클립보드에 복사
        window.navigator.clipboard
            .writeText(url.replace("false", "true"))
            .then(() => {
              this.$eventBus.$emit("onConfirmModal", {
                title: "URL이 복사되었습니다.",
              });
            });
      } catch (e) {
        console.error(e);
        this.$eventBus.$emit("onConfirmModal", {
          title: "URL 복사에 실패하였습니다",
          desc: e.message,
        });
      }
    },
    handleEditMode(type) {
      this.isEditMode = true;
      this.editType = type;
      this.$nextTick(() => {
        this.$refs.inputRef.focus(); // input 요소에 직접 포커스를 줍니다.
      });

      if (type === "title") {
        this.diaryTitle = this.diary.diary_name || ""; // diary_name이 존재하면 기존 값으로 초기화
      } else if (type === "content") {
        this.diaryContent = this.diary.content || ""; // content가 존재하면 기존 값으로 초기화
      }
    },
    async handleBlur(type) {
      this.isEditMode = false;

      if (type === "title" && this.diary.diary_name !== this.diaryTitle) {
        // 변경된 title 값을 저장하는 로직 추가
        this.diary.diary_name = this.diaryTitle;
        this.handleUpdate(
            this.type,
            { diary_name: this.diaryTitle },
            "제목",
        );
      } else if (
          type === "content" &&
          this.diary.content !== this.diaryContent
      ) {
        // 변경된 content 값을 저장하는 로직 추가
        this.diary.content = this.diaryContent;
        this.handleUpdate(
            this.type,
            { content: this.diaryContent },
            "내용",
        );
      }
    },
    async handleUpdate(type, props, updatedPropName) {
      const { putMorningDiary, putNightDiary } = useDiaryService();
      let res;
      if (type === "1") {
        res = await putMorningDiary(props, this.diary.id);
      } else if (type === "2") {
        res = await putNightDiary(props, this.diary.id);
      }

      if (res.success) {
        this.successMessage = `${
            type === "1" ? "꿈" : "일기"
        } ${updatedPropName} 수정이 완료되었어요! `;
        this.isVisible = true;
      }

      // 추후 실행취소 기능 필요
      setTimeout(() => {
        this.isVisible = false;
      }, 2500);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";
.viewport {
  // "(138, 137, 140)"
}

.header {
  background: none;
  border: none;
  justify-content: right;

  padding: 0 20px;
  // margin-top: 10%;

  .btn_url {
    right: 0;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.1);
    padding: 6px 12px 6px 8px;

    /* c1/c1_reg_12 */
    color: var(--white, #fff);
    font-family: "Pretendard";
    font-size: 12px;
    line-height: 160%; /* 19.2px */

    display: flex;
    gap: 8px;
    align-items: center;
    text-align: center;

    cursor: pointer;
  }
}
.contents {
  // BottomSheet 높이: 108px =  calc(32px + (12px * 1.5) + 4px) + 40px + 14px;
  height: calc(100% - (60px));
  height: calc(100% - (60px + constant(safe-area-inset-top)));
  height: calc(100% - (60px + env(safe-area-inset-top)));
  padding: 2rem 0;
  background: var(--v2-gradient_bg_light, linear-gradient(0deg, #DED2FF -46.93%, #D2DAFF -31.6%, #DEE4FF -4.86%, #FFF 117.99%));

  margin-top: calc(60px);
  margin-top: calc(60px + constant(safe-area-inset-top));
  margin-top: calc(60px + env(safe-area-inset-top));

  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: safe center; // safe를 넣지 않으면 상단이 잘리는 문제 발생, 아이폰에서 잘리는 문제 발생으로 주석처리
  overflow-x: hidden;
  gap: 2rem;
}
.diary-image {
  border-radius: 0.94rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.diary-title-box {
  width: calc(100% - 40px);
  overflow: visible;
  display: flex;
  flex-direction: column;
  justify-self: center;

  .diary-title-box-header {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .tag-wrap {
    margin-bottom: 1rem;
    /* border: 1px solid red; */
    flex-wrap: wrap;
  }
}

.diary-title {
  width: 100%;

  /* h1/h1_bold_24 */
  font-family: "Pretendard Bold";
  // font-size: 20px;
  font-size: 1.8rem;
  line-height: 150%; /* 36px */

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;

  &__skeleton {
    @include skeleton;
    width: 80%;
    height: calc(20px * 1.5);
    margin-top: 5px;
  }
}

.diary-date {
  /* b2/b2_med_14 */
  font-family: "Pretendard Medium";
  font-size: 14px;
  line-height: 160%; /* 22.4px */

  &__skeleton {
    @include skeleton;
    width: 20%;
    height: calc(14px * 1.5);
  }
}

.diary-delete {
  /* c1/c1_reg_12 */
  font-family: "Pretendard";
  font-size: 12px;
  line-height: 160%; /* 19.2px */
  color: var(--gray-400, #9CA3AF) !important;

  display: flex;
  gap: 4px;
  align-items: center;

  align-self: flex-start;
  margin: 0 20px;

  /* z-index: 2; // 바텀 시트 때문에 z-index 추가 */
}

.bottom-diary {
  margin-bottom: 120px;
  padding: 0 2rem;
  .bottom-diary-title-box {
    display: flex;
    flex-direction: column;
  }
  .bottom-diary-content {
    margin: 2rem 0 0 0;

    .bottom-diary-content-title {
      /* color: var(--white, #fff); */

      /* b1/b1_bold_16 */
      font-family: "Pretendard Bold";
      font-size: 16px;
      line-height: 160%; /* 25.6px */

      display: flex;
      gap: 12px;

      height: auto;
    }

    .bottom-diary-content-desc {
      /* color: var(--white, #fff); */

      /* b2/b2_reg_14 */
      font-family: "Pretendard";
      font-size: 14px;
      line-height: 160%; /* 22.4px */

      margin-top: 8px;
      text-overflow: ellipsis;
      white-space: normal;

    }
  }
}

.edit-input {
  margin-top: 0.4rem;
  border: 2.5px solid #ffffff35;
  background-color: #ffffff15;
  color: #1f2937;
  width: 100%;
  height: auto;
  border-radius: $border-radius-default;
  padding: 0.4rem 0.6rem;

  &.content {
    height: 20rem;
  }
}

textarea:focus {
  border: none;
  outline: 2.5px solid #ffffff35;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;

}
.bottom-container {
  width: 100%;
}
.bottom-extend {
  margin-top: 60px;
  width: 100%;
}
.bottom-blur {
  max-width: 500px;
  width: 100%;
  height: 76px;
  flex-shrink: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.31) 46.47%, rgba(255, 255, 255, 0.49) 100%);
  backdrop-filter: blur(2px);
  position: absolute;
  bottom: 0; /* 화면 하단에 위치시키기 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px; /* 좌우 패딩 추가 */
}
.ic_event_header {

  object-fit: contain;
  flex-shrink: 0;
}
.ic_start {
  width: 350px;
  height: 48px;
  flex-shrink: 0;
  position: absolute;
  bottom: 24px;
}
.ic_event_down_1 {
  width: 48%;
  height: 48px;
  margin-left: 6px;
  flex-shrink: 0;
}
.ic_event_down_2 {
  width: 48%;
  height: 48px;
  margin-right: 6px;
  flex-shrink: 0;
}
.contents-header {
  width: 500px;
  height: 38px;
  flex-shrink: 0;
  object-fit: contain;
  background: var(--indigo-100, #E0E7FF);
  align-items: center;
  top: 59px; // 상단으로부터의 위치
  left: 50%; // 가로 중앙 정렬
  transform: translateX(-50%); // 가로 중앙 정렬을 위한 변환
  z-index: 999;
  position: fixed; // 고정 위치
}
.contents-header-title {

  justify-content: center;
  margin-top: 8px;
  display: flex;
  color: var(--indigo-600, #4F46E5);
  /* b2/b2_med_14 */
  font-family: "Pretendard Medium";
  font-size: 14px;
}
.contents-header-title span[lang="en"] {
  font-family: "Pretendard Bold";
}
.ic_url {
  display: flex;
  width: 115px;
  height: 31px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
}
.header-title {
  text-align: left;
  color: var(--gray-800, #1F2937);
  font-family: "Pretendard SemiBold";
  font-size: 16px;
  line-height: 150%;
}
.bottom-diary-content-default {
  width: 100%;
  height: 110px;
  flex-shrink: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(8px);
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.bottom-diary-content-default-title {
  color: var(--gray-600, #4B5563);
  text-align: center;
  margin-top: 33px;
  font-family: "Pretendard Bold";
  font-size: 16px;
  line-height: 160%;
}
.bottom-diary-content-default-content {
  color: var(--gray-500, #6B7280);
  text-align: center;
  font-family: "Pretendard";
  font-size: 12px;
  line-height: 160%;
}
.bottom-diary-content {
  margin-top: 8px;
  border-radius: 8px;
  background: var(--white, #FFF);
  display: inline-flex;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
}
.bottom-generate {
  text-align: center;
  display: flex;
  align-items: center;
  width: 100vw !important;
  max-width: 500px;
  flex-direction: column;
  margin-top: 66px;
  padding: 0 20px;
  height: 161px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) -10.8%, rgba(255, 255, 255, 0.39) 39.17%, #FFF 100%);
  flex-shrink: 0;
}
.generate {
  width: 100%;
  height: 48px;
  margin-top: 12px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--v2-CTA_accent, #9398FF);
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.generate-text {
  color: var(--white, #FFF);
  text-align: center;
  font-family: "Pretendard Bold";
  font-size: 16px;
  line-height: 160%;
}
.bottom-generate-title {
  margin-top: 36px;
  color: var(--indigo-500, #6366F1);
  text-align: center;
  font-family: "Pretendard Bold";
  font-size: 14px;
  line-height: 160%;
}
.bottom-generate-content {
  color: var(--gray-400, #9CA3AF);
  text-align: center;
  font-family: "Pretendard";
  font-size: 12px;
  line-height: 160%;
}
.diary-title-box-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.diary-title-not-generate {
  padding: 0 12px;
  width: 100%;
  height: 48px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--indigo-50, #EEF2FF);
  align-items: center;
  display: flex;
}

.diary-title-not-generate-title {
  color: var(--gray-400, #9CA3AF);
  font-family: "Pretendard";
  font-size: 12px;
  line-height: 160%;

  &__skeleton {
    @include skeleton;
    width: 100%;
    height: 48px;
    border-radius: 8px;
  }
}
.tag-not-generate {
  display: inline-flex;
  padding: 6px 11px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background: rgba(145, 145, 145, 0.20);
  color: var(--gray-500, #6B7280);
  font-family: "Pretendard Bold";
  font-size: 12px;
  line-height: 160%; /* 19.2px */

  &__skeleton {
    @include skeleton;
    width: 100%;
    margin-top: 32px;
    height: 31px;
    border-radius: 12px;
  }
}
.bottom-generate-loading {
  text-align: center;
  display: flex;
  align-items: center;
  width: 100vw !important;
  max-width: 500px;
  flex-direction: column;
  margin-top: 66px;
  padding: 0 20px;
  height: 161px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.00) -10.8%, rgba(255, 255, 255, 0.39) 39.17%, #FFF 100%) !important;
  flex-shrink: 0;
}
.bottom-diary-content-default-title-loading {
  color: var(--indigo-500, #6366F1);
  text-align: center;
  margin-top: 33px;
  font-family: "Pretendard Bold";
  font-size: 14px;
  line-height: 160%;
}
.bottom-diary-content-default-content-loading {
  color: var(--gray-400, #9CA3AF);
  text-align: center;
  font-family: "Pretendard";
  font-size: 12px;
  line-height: 160%;
}
.generate-loading {
  width: 100%;
  height: 48px;
  margin-top: 12px;
  flex-shrink: 0;
  border-radius: 12px;
  background: var(--indigo-100, #E0E7FF);
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.generate-text-loading {
  color: var(--indigo-400, #6568FE);
  text-align: center;
  font-family: "Pretendard";
  font-size: 16px;
  line-height: 160%;
}
</style>
