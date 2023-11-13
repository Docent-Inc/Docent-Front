<template>
    <div class="viewport" :style="dynamicBackgrond">
        <Button class="btn_x" @click="this.$router.back()" />

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
        <Image class="diary-image" :url="diary.image_url" width="80%" />
        <!-- <div class="diary-delete" @click="deleteDiary">
            <Icon class="ic_delete_white" />삭제하기
        </div> -->

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
        // console.log(res);
        this.diary = res.data.diary;
        if (type == 1) this.diary.keyword = JSON.parse(this.diary.main_keyword);
        this.isLoading = false;
    },
    methods: {
        deleteDiary() {
            console.log("delete!");
        },
    },
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";
.viewport {
    // "(138, 137, 140)"
    position: relative;
    align-items: center;
    justify-content: center;

    gap: 22px;
    padding-bottom: 50px;
}

.btn_x {
    margin: 10%;
    position: absolute;
    left: 0;
    top: 0;

    z-index: 2; // 바텀 시트 때문에 z-index 추가
}

.diary-image {
    border-radius: 0.94rem;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.diary-title-box {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    gap: 4px;

    // color: var(--white, #fff);
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
    margin: 0 10%;

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
</style>
