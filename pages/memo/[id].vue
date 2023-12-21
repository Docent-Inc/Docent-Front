<template>
    <div class="viewport">
        <div class="header">
            <Icon class="ic_back" @click="this.$router.back()" />
            <span class="memo">메모</span>
        </div>
        <div class="contents">
            <div class="memo-contents memo-contents-1">
                <div class="memo-date-n-button">
                    <div class="memo-date__skeleton" v-if="isLoading"></div>
                    <div class="memo-date" v-else>
                        {{ $dayjs(memo.create_date).format("YYYY.MM.DD") }}
                    </div>
                    <div class="memo-delete" @click="onDelete">
                        <Icon class="ic_delete" />삭제하기
                    </div>
                </div>

                <div class="memo-title__skeleton" v-if="isLoading"></div>
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
            <div class="memo-contents memo-contents-2">
                <div class="tag-wrap">
                    <div class="tag primary" v-for="keyword in memo.keyword">
                        {{ keyword }}
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
import { useDiaryService } from "~/services/diary";
import Toast from "~/components/common/Toast.vue";
import LimitedLength from "~/components/common/LimitedLength.vue";

export default {
    name: "Memo",
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
        this.memo.keyword = JSON.parse(this.memo.tags);
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
                this.handleUpdate(
                    { title: this.memoTitle },
                    "제목",
                );
            } else if (
                  type === "content" && this.memo.content !== this.memoContent) {
                // 변경된 content 값을 저장하는 로직 추가
                this.memo.content = this.memoContent;
                this.handleUpdate(
                    { content: this.memoContent },
                    "내용",
                );
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
    },
    components: { Icon, Toast, LimitedLength },
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

.memo-contents {
    padding: 20px;
}
.memo-contents-1 {
    width: 100%;
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

.memo-contents-2 {
    .tag-wrap {
        margin: 0 0 20px;
    }

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
  border: 2.5px #ffffff !important;
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
.edit-input {
  border: 2px solid #cccccc; /* 기본 태두리 색상 */
  outline: none; /* 포커스시 테두리 제거 */
}

.edit-input:focus {
  border-color: #666666; /* 포커스 시 태두리 색상 */
}
</style>
