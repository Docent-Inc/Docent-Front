<template>
    <div class="viewport">
        <div class="header">
            <BackBtn />
            <span class="memo">메모</span>
        </div>
        <div class="contents">
            <div class="memo-contents memo-contents-1">
                <div class="memo-date-n-button">
                    <div class="memo-date">
                        {{ $dayjs(memo.create_date).format("YYYY.MM.DD") }}
                    </div>
                    <div class="memo-delete" @click="onDelete">
                        <Icon class="ic_delete" />삭제하기
                    </div>
                </div>
                <div v-if="memo.title === ''">
                    <div v-if="isLoading">
                        <div
                            class="memo-title-not-generate-title__skeleton"
                        ></div>
                    </div>
                    <div v-else-if="!isLoading">
                        <div class="memo-title-not-generate">
                            <div
                                class="memo-title-not-generate-title"
                                @click="handleEditMode('title')"
                            >
                                <input
                                    class="edit-input"
                                    ref="inputRef"
                                    v-if="isEditMode && editType === 'title'"
                                    v-model="memoTitle"
                                    @blur="handleBlur('title')"
                                />
                                <div v-else>{{ memoTitle || memo.title }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="memo-title" @click="handleEditMode('title')">
                        <input
                            class="edit-input"
                            ref="inputRef"
                            v-if="isEditMode && editType === 'title'"
                            v-model="memoTitle"
                            @blur="handleBlur('title')"
                        />
                        <div v-else>{{ memoTitle || memo.title }}</div>
                    </div>
                </div>
            </div>
            <div class="contents-body">
                <div class="memo-contents memo-contents-2">
                    <div v-if="isGenerated">
                        <div class="tag-wrap">
                            <div class="tag accent" v-for="tag in memo.keyword">
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
                    <div
                        class="bottom-memo-content-desc"
                        @click="handleEditMode('content')"
                    >
                        <textarea
                            class="edit-input content"
                            ref="inputRef"
                            v-if="isEditMode && editType === 'content'"
                            v-model="memoContent"
                            @blur="handleBlur('content')"
                        />
                        <LimitedLength
                            :content="memoContent"
                            :limitedContentLength="1000"
                            v-if="isEditMode && editType === 'content'"
                            @update:content="memoContent = $event"
                        />
                        <div
                            v-else-if="memoContent || memo.content"
                            v-html="
                                memoContent
                                    ? escapeHtml(memoContent).replace(
                                          /\n/g,
                                          '<br>',
                                      )
                                    : escapeHtml(memo.content).replace(
                                          /\n/g,
                                          '<br>',
                                      )
                            "
                        ></div>
                    </div>
                </div>
                <div v-if="!isGenerated" class="bottom-diary-content-default">
                    <div v-if="!isLoading" class="bottom-generate">
                        <span class="bottom-generate-title"
                            >Looi가 제목과 키워드를 자동으로 지어줘요!</span
                        >
                        <span class="bottom-generate-content"
                            >직접 제목을 지으셨다면 지으신 제목은 유지되니
                            걱정하지마세요!</span
                        >
                        <div class="generate" @click="handleGenerate()">
                            <span class="generate-text"
                                >제목과 키워드 생성하기</span
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Toast
            v-if="isVisible"
            @click="isVisible = false"
            :text="successMessage"
            :top="60"
        />
    </div>
</template>
<script>
import Icon from "~/components/common/Icon.vue";
import { useDiaryService } from "../../services/diary";
import Toast from "~/components/common/Toast.vue";
import LimitedLength from "~/components/common/LimitedLength.vue";
import BackBtn from "~/components/common/buttons/BackBtn.vue";

export default {
    name: "Memo",
    components: { Icon, Toast, LimitedLength, BackBtn },
    data() {
        return {
            memo: {},
            isLoading: true,
            // 수정
            isEditMode: false,
            editType: "",
            memoTitle: "",
            memoContent: "",
            isVisible: false,
            successMessage: "",
            isGenerated: false,
        };
    },
    async mounted() {
        const memo_id = this.$route.params.id;
        const { getMemo } = useDiaryService();
        const res = await getMemo(memo_id);

        if (!res.success) {
            this.$eventBus.$emit("onConfirmModal", {
                title: "조회 실패하였습니다.",
                desc: res.message,
                callback: () => {
                    this.$router.back();
                },
            });
        }

        this.memo = res.data.memo;
        if (this.memo.title === "") {
            this.memoTitle = "제목을 직접 입력해보세요!";
        } else {
            this.memoTitle = this.memo.title;
        }
        if (this.memo.is_generated) {
            this.isGenerated = true;
            this.memo.keyword = JSON.parse(this.memo.tags);
        }
        this.isLoading = false;
    },
    computed: {},
    methods: {
        onDelete() {
            this.$eventBus.$emit("onCustomModal", {
                title: "정말 이 기록을 삭제하시겠어요?",
                desc: "삭제한 기록은 영영 돌아오지 않아요!",
                confirm: "삭제하기",
                cancel: "남겨두기",
                callback: this.deleteMemo,
            });
        },
        handleEditMode(type) {
            this.isEditMode = true;
            this.editType = type;
            this.$nextTick(() => {
                this.$refs.inputRef.focus(); // input 요소에 직접 포커스를 줍니다.
            });

            if (type === "title") {
                this.memoTitle = this.memo.title || ""; // diary_name이 존재하면 기존 값으로 초기화
            } else if (type === "content") {
                this.memoContent = this.memo.content || ""; // content가 존재하면 기존 값으로 초기화
            }
        },
        async deleteMemo() {
            const { deleteMemo } = useDiaryService();
            const res = await deleteMemo(this.$route.params.id);

            if (res.success) {
                // 성공 시, 리스트 페이지로 이동
                this.$eventBus.$emit("onConfirmModal", {
                    title: "삭제되었습니다.",
                    callback: () => {
                        this.$router.back();
                    },
                });
            } else {
                this.$eventBus.$emit("onConfirmModal", {
                    title: "삭제에 실패하였습니다.",
                    desc: res.message,
                });
            }
        },
        async handleBlur(type) {
            this.isEditMode = false;

            if (type === "title" && this.memo.title !== this.memoTitle) {
                // 변경된 title 값을 저장하는 로직 추가
                this.memo.title = this.memoTitle;
                this.handleUpdate({ title: this.memoTitle }, "제목");
            } else if (
                type === "content" &&
                this.memo.content !== this.memoContent
            ) {
                // 변경된 content 값을 저장하는 로직 추가
                this.memo.content = this.memoContent;
                this.handleUpdate({ content: this.memoContent }, "내용");
            }
        },
        async handleUpdate(props, updatedPropName) {
            const { putMemo } = useDiaryService();
            let res = await putMemo(props, this.memo.id);
            if (res.success) {
                this.successMessage = `${updatedPropName} 수정이 완료되었어요! `;
                this.isVisible = true;
            }

            // 추후 실행취소 기능 필요
            setTimeout(() => {
                this.isVisible = false;
            }, 2500);
        },
        async handleGenerate() {
            const { generateMemo } = useDiaryService();
            let res;
            this.isLoading = true;

            this.$eventBus.$emit("onConfirmModal", {
                title: "제목과 키워드를 생성하고 있어요!",
                desc: "AI 생성에는 시간이 소요돼요. 잠시만 기다려주세요!",
                callback: () => {},
            });

            res = await generateMemo(this.memo.id);

            if (!res.success) {
                this.$eventBus.$emit("onConfirmModal", {
                    title: "조회 실패하였습니다.",
                    desc: res.message,
                    callback: () => {
                        this.$router.back();
                    },
                });
            }

            this.memo = res.data.memo;
            this.memo.keyword = JSON.parse(this.memo.tags);
            this.isGenerated = true;
            this.memoTitle = this.memo.title;
            this.memoContent = this.memo.content;
            this.isLoading = false;
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";
.contents {
    height: calc(100% - (60px));
    height: calc(100% - (60px + constant(safe-area-inset-top)));
    height: calc(100% - (60px + env(safe-area-inset-top)));

    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));
}

.memo {
    color: var(--gray-800, #1f2937);
    font-family: "Pretendard SemiBold";
    font-size: 16px;
    line-height: 150%; /* 24px */
    margin-left: 10px;
}

.memo-contents-1 {
    width: 100%;
    padding: 20px;
    background: linear-gradient(
        27deg,
        #ded2ff -75.98%,
        #d2daff -58.29%,
        #dee4ff -27.42%,
        #fff 114.43%
    );

    .memo-date-n-button {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .memo-date {
            color: var(--gray-500, #6b7280);

            /* b2/b2_med_14 */
            font-family: "Pretendard Medium";
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 160%; /* 22.4px */

            &__skeleton {
                @include skeleton;
                width: 20%;
                height: calc(14px * 1.6);
            }
        }

        .memo-delete {
            color: var(--gray-400, #9ca3af);

            /* c1/c1_reg_12 */
            font-family: "Pretendard";
            font-size: 12px;
            line-height: 160%; /* 19.2px */

            display: flex;
            gap: 4px;
            align-items: center;
        }
    }

    .memo-title {
        color: var(--gray-700, #374151);

        /* h1/h1_bold_24 */
        font-family: "Pretendard Bold";
        font-size: 24px;
        line-height: 150%; /* 36px */

        margin-bottom: 30px;

        &__skeleton {
            @include skeleton;
            width: 80%;
            height: calc(24px * 1.5);
            margin: 5px 0 30px;
        }
    }
}
.tag-wrap {
    margin: 20px 0 20px 0;
}
.tag.accent {
    border-radius: 12px;
    background: rgba(167, 139, 250, 0.2) !important;
    color: var(--violet-400, #a78bfa);
    font-family: "Pretendard Bold";
    font-size: 12px;
    line-height: 160%; /* 19.2px */
}
.memo-contents-2 {
    .memo-content {
        color: var(--gray-500, #6b7280);

        /* b1/b1_reg_16 */
        font-family: "Pretendard";
        font-size: 16px;
        line-height: 160%; /* 25.6px */
        text-transform: capitalize;
    }
}
.bottom-memo-content-desc {
    /* color: var(--white, #fff); */

    /* b2/b2_reg_14 */
    font-family: "Pretendard";
    font-size: 14px;
    line-height: 160%; /* 22.4px */

    margin-top: 8px;
}
.edit-input {
    margin-top: 0.4rem;
    border-radius: 8px;
    border: 1px solid var(--indigo-400, #6568fe);
    background: var(--white, #fff);
    color: #1f2937;
    width: 100%;
    height: auto;
    padding: 0.4rem 0.6rem;

    &.content {
        height: 20rem;
    }
}
.edit-input {
    border: 2px solid #cccccc; /* 기본 태두리 색상 */
}

.edit-input:focus {
    border-radius: 8px;
    border: 1px solid var(--indigo-400, #6568fe);
    background: var(--white, #fff);
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
}
.bottom-generate {
    margin-top: auto;
    text-align: center;
    display: flex;
    align-items: center;
    width: 100vw !important;
    max-width: 500px;
    flex-direction: column;
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
.memo-title-not-generate-title {
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
.memo-title-box-top {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
}
.memo-title-not-generate {
    padding: 0 12px;
    width: 100%;
    height: 48px;
    flex-shrink: 0;
    border-radius: 8px;
    margin-top: 4px;
    align-items: center;
    display: flex;
    border-radius: 8px;
    background: var(--white, #fff);
}

.memo-title-not-generate-title {
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
.contents-body {
    width: 100%;
    min-height: calc(100% - 180px);
    padding: 0 20px;
    flex-direction: column;
    justify-content: space-between;
    display: flex;
}
</style>
