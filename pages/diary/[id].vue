<template>
    <section class="viewport">
        <header class="header">
            <div class="left-items">
                <BackBtn />
                <span v-if="type === '1'" class="header-title">꿈</span>
                <span v-else class="header-title">일기</span>
            </div>
            <v-icon class="ic_url" @click="shareURL" />
        </header>

        <article class="contents">
            <!-- 1. 상단 영역 (날짜, 제목) -->
            <div class="diary-title-box">
                <div class="diary-title-box-top">
                    <div class="diary-date">
                        {{ $dayjs(diary.create_date).format("YYYY.MM.DD") }}
                    </div>
                    <div class="diary-delete" @click="onDelete">
                        <Icon class="ic_delete" />삭제하기
                    </div>
                </div>
                <div v-if="diary.diary_name === ''">
                    <div v-if="isLoading">
                        <div
                            class="diary-title-not-generate-title__skeleton"
                        ></div>
                    </div>
                    <div v-else-if="!isLoading">
                        <div class="diary-title-not-generate">
                            <div
                                class="diary-title-not-generate-title"
                                @click="handleEditMode('title')"
                            >
                                <input
                                    class="edit-input"
                                    ref="inputRef"
                                    v-if="isEditMode && editType === 'title'"
                                    v-model="diaryTitle"
                                    @blur="handleBlur('title')"
                                />
                                <div v-else>
                                    {{ diaryTitle || diary.diary_name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="diary-title" @click="handleEditMode('title')">
                        <input
                            class="edit-input"
                            ref="inputRef"
                            v-if="isEditMode && editType === 'title'"
                            v-model="diaryTitle"
                            @blur="handleBlur('title')"
                        />
                        <div v-else>{{ diaryTitle }}</div>
                    </div>
                </div>
                <div v-if="isGenerated">
                    <div class="tag-wrap">
                        <div class="tag accent" v-for="tag in diary.keyword">
                            {{ tag }}
                        </div>
                    </div>
                </div>
                <div v-else-if="!isGenerated">
                    <div v-if="isLoading">
                        <div class="tag-not-generate__skeleton"></div>
                    </div>
                    <div v-else-if="!isLoading">
                        <div class="tag-wrap">
                            <div class="tag-not-generate">
                                키워드 생성 전이에요!
                            </div>
                            <div class="tag-wrap"></div>
                        </div>
                    </div>
                </div>
                <div v-if="isLoading">
                    <div class="diary-image__skeleton"></div>
                </div>
            </div>

            <!-- 2. 중간 영역 (이미지, 삭제 버튼) -->
            <!-- maxWidth="calc((100vh - (60px + 20px)) * 0.6)" -->
            <div v-if="!isLoading" class="diary-image-div" @click="handleGenerate()">
                <Image
                    class="diary-image"
                    :url="diary.image_url"
                    width="calc(100% - 40px)"
                    maxWidth="400px"
                />
            </div>

            <!-- 3. 바텀시트 영역 -->
            <div class="bottom-container">
                <div class="bottom-diary">
                    <div class="bottom-diary-content">
                        <div class="bottom-diary-content-title">
                          <div class="left-content">
                            <Icon class="ic_memo" />
                            <span v-if="type === '1'">꿈 내용</span>
                            <span v-else>일기 내용</span>
                          </div>
                        </div>
                        <div
                            class="bottom-diary-content-desc"
                            @click="handleEditMode('content')"
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
                          <div class="left-content">
                            <Icon class="ic_crystal" />꿈을 통해 본
                            {{ user?.nickname }}님의 마음
                          </div>
                          <Icon v-if="diary.is_like&&isGenerated" class="ic_like_on" @click="updateLike"/>
                          <Icon v-if="!diary.is_like&&isGenerated" class="ic_like_off" @click="updateLike"/>
                        </div>
                        <div
                            v-if="!isGenerated"
                            class="bottom-diary-content-default"
                        >
                            <span class="bottom-diary-content-default-title">아직 꿈 해석이 생성되기 전이에요!</span>
                            </div>
                        <div
                            v-if="isGenerated"
                            class="bottom-diary-content-desc"
                        >
                            {{ diary.resolution }}
                        </div>
                    </div>
                    <div v-if="type == 2" class="bottom-diary-content">
                        <div class="bottom-diary-content-title">
                          <div class="left-content">
                            <Icon class="ic_reply" />Looi의 답장
                          </div>
                          <Icon v-if="diary.is_like&&isGenerated" class="ic_like_on" @click="updateLike"/>
                          <Icon v-if="!diary.is_like&&isGenerated" class="ic_like_off" @click="updateLike"/>
                        </div>
                        <div
                            v-if="!isGenerated"
                            class="bottom-diary-content-default"
                        >
                            <span class="bottom-diary-content-default-title">아직 답장이 생성되기 전이에요!</span>
                        </div>
                        <div
                            v-if="isGenerated"
                            class="bottom-diary-content-desc"
                        >
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
</template>
<script>
import { mapState, mapActions } from "pinia";
import { useUserStore } from "~/store/user";
import { useRecordStore } from "~/store/record";
import { escapeHtml } from "~/utils/utils";

import { useDiaryService } from "../../services/diary";
import Button from "~/components/common/Button.vue";
import Icon from "~/components/common/Icon.vue";
import Image from "~/components/common/Image.vue";
import Toast from "~/components/common/Toast.vue";
import LimitedLength from "~/components/common/LimitedLength.vue";
import BackBtn from "~/components/common/buttons/BackBtn.vue";

export default {
    name: "Diary",
    components: {
        Button,
        Icon,
        Image,
        Toast,
        LimitedLength,
        BackBtn,
    },
    data() {
        return {
            diary: {},
            type: "1",
            isLoading: true,
            isOpen: false,
            isGenerated: false,
            // 수정
            isEditMode: false,
            editType: "",
            diaryTitle: "",
            diaryContent: "",
            // 토스트
            isVisible: false,
            successMessage: "",
        };
    },
    setup() {
        const { getMorningdiary, getNightdiary } = useDiaryService();
        const { params, query } = getCurrentInstance().proxy.$route;
        const record = useAsyncData(`content-${params.id}`, async () => {
            const res =
                query.type === "1"
                    ? await getMorningdiary(params.id)
                    : await getNightdiary(params.id);

            if (res.success) {
                return res.data?.diary || null;
            } else {
                return null;
            }
        });

        useSeoMeta({
            title: () => record.data.value?.diary_name,
            ogTitle: () => record.data.value?.diary_name,
            ogDescription: () => record.data.value?.content,
        });
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
        const { getMorningdiary, getNightdiary } = useDiaryService();

        const id = this.$route.params.id;
        const type = this.$route.query.type;
        this.isLoading = true;
        this.type = type;

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
        this.isGenerated = res.data.diary.is_generated;
        if (this.diary.diary_name === "") {
            this.diaryTitle = "제목을 직접 입력해보세요!";
        } else {
            this.diaryTitle = this.diary.diary_name;
        }
        if (this.isGenerated)
            this.diary.keyword = JSON.parse(this.diary.main_keyword);
        this.diary.resolution = res.data.diary.resolution;
        this.diary.is_like = res.data.diary.is_like;
        this.isLoading = false;
    },
    methods: {
        ...mapActions(useRecordStore, ["deleteOptimisticRecord"]),

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
                        this.$eventBus.$emit("refetch", { path: "/mypage" });
                        this.$router.back();
                    },
                });
            } else {
                // 실패 시, 문구 띄우고 새로고침
                this.$eventBus.$emit("onConfirmModal", {
                    title: "삭제에 실패하였습니다.",
                    desc: res.message,
                });
            }
        },
        async shareURL() {
            if (!this.isGenerated) {
                this.$eventBus.$emit("onConfirmModal", {
                    title: "URL 복사에 실패하였습니다",
                    desc: "URL 복사는 Looi의 답장이 생성된 후에 가능합니다.",
                });
                return;
            }
            const baseUrl = window.location.href
                .split("/")
                .slice(0, 3)
                .join("/");
            let url = `${baseUrl}/share/${this.diary.share_id}`;
            if (this.type === "1") {
                url += "?type=1";
            } else if (this.type === "2") {
                url += "?type=2";
            }
            try {
                if (!navigator?.clipboard?.writeText)
                    throw new Error(
                        "복사 기능이 제공되지 않는 브라우저입니다.",
                    );

                // 클립보드에 복사
                window.navigator.clipboard.writeText(url).then(() => {
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
        async updateLike() {
            const { putMorningDiary, putNightDiary } = useDiaryService();
            let res;
            this.diary.is_like = !this.diary.is_like;
            if (this.type === "1") {
                res = await putMorningDiary({is_like: this.diary.is_like}, this.diary.id);
            } else if (this.type === "2") {
                res = await putNightDiary({is_like: this.diary.is_like}, this.diary.id);
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
        async handleGenerate() {
            console.log(this.isGenerated);
            if (this.isGenerated) return;

            const { generateMorningDiary, generateNightDiary } =
                useDiaryService();
            let res;
            this.isLoading = true;

            this.$eventBus.$emit("onConfirmModal", {
                title: "제목, 키워드, 그림, 답장을 생성하고 있어요!",
                desc: "생성된 Looi의 답장에 좋아요를 남길 수 있어요! 답장이 마음에 든다면 좋아요를 남겨보세요.",
                callback: () => {},
            });

            if (this.type === "1") {
                res = await generateMorningDiary(this.diary.id);
            } else if (this.type === "2") {
                res = await generateNightDiary(this.diary.id);
            }

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
            this.diary.diary_name = res.data.diary.diary_name;
            this.isGenerated = res.data.diary.is_generated;
            this.diaryTitle = res.data.diary.diary_name;
            this.diary.resolution = res.data.diary.resolution;
            this.isGenerated = res.data.diary.is_generated;
            this.like = res.data.diary.like;
            this.diary.keyword = JSON.parse(this.diary.main_keyword);
            this.isLoading = false;
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
    background: #ffffff;
    border: none;
    justify-content: space-between;

    padding: 0 20px;
    // margin-top: 10%;

    .left-items {
        gap: 10px;
        display: flex; // 왼쪽 아이템들을 위한 Flex 컨테이너
        align-items: center; // 세로 중앙 정렬
    }
}

.contents {
    background: var(
        --v2-gradient_bg_light,
        linear-gradient(
            0deg,
            #ded2ff -46.93%,
            #d2daff -31.6%,
            #dee4ff -4.86%,
            #fff 117.99%
        )
    );
    // BottomSheet 높이: 108px =  calc(32px + (12px * 1.5) + 4px) + 40px + 14px;
    height: calc(100% - (60px));
    height: calc(100% - (60px + constant(safe-area-inset-top)));
    height: calc(100% - (60px + env(safe-area-inset-top)));
    padding: 2rem 0;

    margin-top: calc(60px);
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));

    display: flex;
    flex-direction: column;
    align-items: center;
}
.diary-image-div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.diary-image {
    border-radius: 0.94rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin-bottom: 16px;

    &__skeleton {
        @include skeleton;
        border-radius: 0.94rem;
        margin-top: 16px;
        aspect-ratio: 1/1;
        width: 100%;
        max-width: 500px;
    }
}

.diary-title-box {
    width: calc(100% - 40px);
    overflow: visible;
    display: flex;
    flex-direction: column;

    justify-self: center;

    .tag-wrap {
        margin-top: 2rem;
        margin-bottom: 1.6rem;
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
    color: var(--gray-500, #6b7280);

    &__skeleton {
        @include skeleton;
        width: 20%;
        height: calc(14px * 1.5);
    }
}

.diary-delete {
    display: flex;
    color: var(--gray-400, #9ca3af);
    font-family: "Pretendard";
    font-size: 12px;
    line-height: 160%;
}
.bottom-diary-title-box {
    display: flex;
    flex-direction: column;
}
.bottom-diary {
    margin-bottom: 16px;
    padding: 0 2rem;
    .bottom-diary-content {
        margin-top: 12px;
        .bottom-diary-content-title {
            color: var(--gray-700, #374151);
            justify-content: space-between; /* 양 끝 정렬 */
            align-items: center; /* 수직 중앙 정렬 */

            /* b1/b1_bold_16 */
            font-family: "Pretendard Bold";
            font-size: 16px;
            line-height: 160%; /* 25.6px */

            display: flex;
            width: 100%;

            height: auto;
            .left-content {
              display: flex;
              align-items: center;
              gap: 12px;
            }
        }

        .bottom-diary-content-desc {
            width: 100%;
            color: var(--gray-500, #6b7280);

            /* b2/b2_reg_14 */
            font-family: "Pretendard";
            font-size: 14px;
            line-height: 160%; /* 22.4px */

            margin-top: 8px;
        }
    }
}

.edit-input {
    margin-top: 0.4rem;
    border-radius: 8px;
    border: 1px solid var(--indigo-400, #6568fe);
    background: var(--indigo-100, #e0e7ff);
    color: #1f2937;
    width: 100%;
    height: auto;
    padding: 0.4rem 0.6rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;

    &.content {
        height: 20rem;
    }
}

textarea:focus {
    outline: 2.5px solid #ffffff35;
}
.bottom-container {
    width: 100%;
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
    color: var(--gray-800, #1f2937);
    font-family: "Pretendard SemiBold";
    font-size: 16px;
    line-height: 150%;
}
.bottom-diary-content-default {
    width: 100%;
    height: 110px;
    flex-shrink: 0;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.bottom-diary-content-default-title {
    color: var(--gray-400, #9CA3AF);
    text-align: center;
    font-family: "Pretendard";
    font-size: 14px;
    line-height: 160%;
}
.bottom-diary-content {
    margin-top: 8px;
    border-radius: 8px;
    background: var(--white, #fff);
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
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) -10.8%,
        rgba(255, 255, 255, 0.39) 39.17%,
        #fff 100%
    );
    flex-shrink: 0;
}
.generate {
    width: 100%;
    height: 48px;
    margin-top: 12px;
    flex-shrink: 0;
    border-radius: 12px;
    background: var(--v2-CTA_accent, #9398ff);
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.generate-text {
    color: var(--white, #fff);
    text-align: center;
    font-family: "Pretendard Bold";
    font-size: 16px;
    line-height: 160%;
}
.bottom-generate-title {
    margin-top: 36px;
    color: var(--indigo-500, #6366f1);
    text-align: center;
    font-family: "Pretendard Bold";
    font-size: 14px;
    line-height: 160%;
}
.bottom-generate-content {
    color: var(--gray-400, #9ca3af);
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
    background: var(--indigo-50, #eef2ff);
    align-items: center;
    display: flex;
}

.diary-title-not-generate-title {
    color: var(--gray-400, #9ca3af);
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
    background: rgba(145, 145, 145, 0.2);
    color: var(--gray-500, #6b7280);
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
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) -10.8%,
        rgba(255, 255, 255, 0.39) 39.17%,
        #fff 100%
    ) !important;
    flex-shrink: 0;
}
.bottom-diary-content-default-title-loading {
    color: var(--indigo-500, #6366f1);
    text-align: center;
    margin-top: 33px;
    font-family: "Pretendard Bold";
    font-size: 14px;
    line-height: 160%;
}
.bottom-diary-content-default-content-loading {
    color: var(--gray-400, #9ca3af);
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
    background: var(--indigo-100, #e0e7ff);
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.generate-text-loading {
    color: var(--indigo-400, #6568fe);
    text-align: center;
    font-family: "Pretendard";
    font-size: 16px;
    line-height: 160%;
}
.ic_like_on, .ic_like_off {
    width: 24px;
    height: 24px;
    right: 0;
}
</style>
