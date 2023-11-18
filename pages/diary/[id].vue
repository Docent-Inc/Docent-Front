<template>
    <div class="viewport" :style="dynamicBackgrond">
        <div class="header">
            <Button class="btn_x" @click="this.$router.back()" />

            <div class="btn_url">
                <Icon class="ic_url" />
                <span>URL 공유하기</span>
            </div>
        </div>

        <div class="contents">
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

                    <div class="diary-title">
                        {{ diary.diary_name }}
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
            <div class="diary-delete" @click="onDelete">
                <Icon class="ic_delete_white" />삭제하기
            </div>
        </div>

        <!-- 3. 바텀시트 영역 -->
        <BottomSheet :title="bottomSheetTitle">
            <div class="bottom-diary">
                <div class="bottom-diary-title-box">
                    <div class="diary-date">
                        {{ $dayjs(diary.create_date).format("YYYY.MM.DD") }}
                    </div>
                    <div class="diary-title">{{ diary.diary_name }}</div>
                </div>

                <div class="bottom-diary-content">
                    <div class="bottom-diary-content-title">
                        <Icon class="ic_memo" /> 일기 내용
                    </div>
                    <div class="bottom-diary-content-desc">
                        {{ diary.content }}
                    </div>
                </div>

                <div v-if="type == 1" class="bottom-diary-content">
                    <div class="bottom-diary-content-title">
                        <Icon class="ic_crystal" />꿈을 통해 본
                        {{ user?.nickname }}님의 마음
                    </div>

                    <div class="bottom-diary-content-desc">
                        <div class="tag-wrap">
                            <div
                                class="tag accent"
                                v-for="tag in diary.keyword"
                            >
                                {{ tag }}
                            </div>
                        </div>
                        {{ diary.resolution }}
                    </div>
                </div>
            </div>
        </BottomSheet>
    </div>
</template>
<script>
import { mapState } from "pinia";
import { useUserStore } from "~/store/user";

import { useDiaryService } from "../../services/diary";
import Button from "~/components/common/Button.vue";
import Icon from "~/components/common/Icon.vue";
import Image from "~/components/common/Image.vue";
import BottomSheet from "~/components/common/BottomSheet.vue";

export default {
    name: "Diary",
    components: {
        Button,
        Icon,
        Image,
        BottomSheet,
    },
    data() {
        return {
            diary: {},
            type: "1",
            isLoading: true,
        };
    },
    computed: {
        ...mapState(useUserStore, ["user"]),
        dynamicBackgrond() {
            let background_color = `rgb(0, 0, 0)`;
            let text_color = "#fff";

            if (this.diary.background_color) {
                const colorList = JSON.parse(this.diary.background_color);

                if (colorList.length > 1) {
                    background_color = `linear-gradient(rgb${colorList[0]}, rgb${colorList[1]})`;
                    text_color = getTextColorForBackground(
                        colorList.map((color) => `rgb${color}`),
                    );
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
        bottomSheetTitle() {
            if (this.type === "1") return "꿈 해석 보기";
            else return "일기 자세히 보기";
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
            console.log("res >> ", res);

            if (res.success) {
                // 성공 시, 리스트 페이지로 이동
                this.$eventBus.$emit("onConfirmModal", {
                    title: "삭제되었습니다.",
                    callback: () => {
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
    margin-top: 10%;
}

.contents {
    height: calc(100% - (60px + 10%));
    height: calc(100% - (60px + 10% + constant(safe-area-inset-top)));
    height: calc(100% - (60px + 10% + env(safe-area-inset-top)));

    margin-top: calc(60px + 10%);
    margin-top: calc(60px + 10% + constant(safe-area-inset-top));
    margin-top: calc(60px + 10% + env(safe-area-inset-top));

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 22px;
}

.diary-image {
    border-radius: 0.94rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.diary-title-box {
    width: calc(100% - 40px);
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.diary-title {
    width: 100%;

    /* h1/h1_bold_24 */
    font-family: "Pretendard Bold";
    font-size: 20px;
    line-height: 150%; /* 36px */

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
.diary-tags {
    margin-top: 0.5rem;
    .tag {
        font-size: 14px; // 1.2rem;;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.1);
        border: none;
    }
}

.diary-delete {
    color: var(--white, #fff);

    /* c1/c1_reg_12 */
    font-family: "Pretendard";
    font-size: 12px;
    line-height: 160%; /* 19.2px */

    display: flex;
    gap: 4px;
    align-items: center;

    align-self: flex-start;
    margin: 0 20px;

    z-index: 2; // 바텀 시트 때문에 z-index 추가
}

.bottom-diary {
    margin-bottom: 60px;
    .bottom-diary-title-box {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .bottom-diary-content {
        margin-top: 36px;

        .bottom-diary-content-title {
            color: var(--white, #fff);

            /* b1/b1_bold_16 */
            font-family: "Pretendard Bold";
            font-size: 16px;
            line-height: 160%; /* 25.6px */

            display: flex;
            gap: 12px;
        }

        .bottom-diary-content-desc {
            color: var(--white, #fff);

            /* b2/b2_reg_14 */
            font-family: "Pretendard";
            font-size: 14px;
            line-height: 160%; /* 22.4px */

            margin-top: 8px;

            .tag-wrap {
                margin: 0 0 12px;
            }
        }
    }
}

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
}

.diary-top {
    width: calc(100% - 40px);
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 10%;
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);

    z-index: 2; // 바텀 시트 때문에 z-index 추가
}
</style>
