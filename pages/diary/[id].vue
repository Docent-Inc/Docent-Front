<template>
    <section class="viewport" :style="dynamicBackground">
        <header class="header">
            <Button class="btn_x" @click="this.$router.back()" />

            <div class="btn_url" @click="shareURL">
                <Icon class="ic_url" />
                <span>URL 공유하기</span>
            </div>
        </header>

        <article class="contents">
            <!-- 1. 상단 영역 (날짜, 제목) -->
            <div class="diary-title-box">
                <div v-if="isLoading">
                    <div class="diary-date__skeleton"></div>
                    <div class="diary-title__skeleton"></div>
                </div>
                <div v-else>
                    <div class="diary-date">
                        {{ $dayjs(diary.create_date).format("YYYY.MM.DD") }}
                    </div>

                    <div class="diary-title" @click="handleEditMode('title')">
                        <input
                            class="edit-input"
                            ref="inputRef"
                            v-if="isEditMode && editType === 'title'"
                            v-model="diaryTitle"
                            @blur="handleBlur('title')"
                            :style="dynamicInputTop"
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
            <div
                class="diary-delete"
                @click="onDelete"
                :style="bottomTextColor"
            >
                <Icon class="ic_delete_white" />삭제하기
            </div>

            <!-- 3. 바텀시트 영역 -->
            <div class="bottom-container" :style="bottomTextColor">
                <div class="bottom-diary">
                    <div class="bottom-diary-content">
                        <div class="bottom-diary-content-title">
                            <Icon class="ic_memo" />
                            <span v-if="type === '1'">꿈 내용</span>
                            <span v-else>일기 내용</span>
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
                                :style="dynamicInputBottom"
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
                            <Icon class="ic_crystal" />꿈을 통해 본
                            {{ user?.nickname }}님의 마음
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

export default {
    name: "Diary",
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
        dynamicBackground() {
            let background_color = `rgb(0, 0, 0)`;
            let text_color = "#fff";

            if (this.diary.background_color) {
                const colorList = JSON.parse(this.diary.background_color);

                if (colorList.length > 1) {
                    background_color = `linear-gradient(rgb${colorList[0]}, rgb${colorList[1]})`;
                    text_color = getTextColorForBackground([
                        `rgb${colorList[0]}`,
                    ]);
                } else {
                    background_color = `rgb${colorList[0]}`;
                    text_color = getTextColorForBackground([
                        `rgb${colorList[0]}`,
                    ]);
                }
            }

            return {
                background: background_color,
                color: text_color,
            };
        },
        bottomTextColor() {
            let text_color = "#fff";

            if (this.diary.background_color) {
                const colorList = JSON.parse(this.diary.background_color);

                if (colorList.length > 1) {
                    text_color = getTextColorForBackground([
                        `rgb${colorList[1]}`,
                    ]);
                } else {
                    text_color = getTextColorForBackground([
                        `rgb${colorList[0]}`,
                    ]);
                }
            }

            return {
                color: text_color,
            };
        },
        dynamicInputTop() {
            let text_color = "#fff";

            if (this.diary.background_color) {
                const colorList = JSON.parse(this.diary.background_color);

                if (colorList.length > 1) {
                    text_color = getTextColorForBackground([
                        `rgb${colorList[0]}`,
                    ]);
                } else {
                    text_color = getTextColorForBackground([
                        `rgb${colorList[0]}`,
                    ]);
                }
            }

            return {
                color: text_color,
            };
        },
        dynamicInputBottom() {
            let text_color = "#fff";

            if (this.diary.background_color) {
                const colorList = JSON.parse(this.diary.background_color);

                if (colorList.length > 1) {
                    text_color = getTextColorForBackground([
                        `rgb${colorList[1]}`,
                    ]);
                } else {
                    text_color = getTextColorForBackground([
                        `rgb${colorList[0]}`,
                    ]);
                }
            }

            return {
                color: text_color,
            };
        },
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

        if (type == 1) this.diary.keyword = JSON.parse(this.diary.main_keyword);
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
                    .writeText(url.replace("diary", "share"))
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
            console.log(type, props, updatedPropName);
            let res;
            if (type === "1") {
                res = await putMorningDiary(props, this.diary.id);
            } else if (type === "2") {
                res = await putNightDiary(props, this.diary.id);
            }

            if (res.success) {
                this.successMessage = `일기 ${updatedPropName} 수정이 완료되었어요! `;
                this.isVisible = true;
            }
            console.log(res);

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
    justify-content: space-between;

    padding: 0 20px;
    // margin-top: 10%;

    .btn_url {
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

    margin-top: calc(60px);
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: safe center; // safe를 넣지 않으면 상단이 잘리는 문제 발생

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
    gap: 4px;

    justify-self: center;

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

    display: flex;
    gap: 4px;
    align-items: center;

    align-self: flex-start;
    margin: 0 20px;

    /* z-index: 2; // 바텀 시트 때문에 z-index 추가 */
}

.bottom-diary {
    margin-bottom: 60px;
    padding: 0 2rem;
    .bottom-diary-title-box {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .bottom-diary-content {
        margin: 2rem 0 3rem 0;

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
}
.bottom-container {
    width: 100%;
}
</style>
