<template>
    <section class="viewport" :style="dynamicBackgrond">
        <div class="header">
            <div class="button" @click="router.replace('/')">
                <Icon class="logo_look_small" />
                <span>Look 체험해보기</span>
            </div>
        </div>

        <article class="container">
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

                    <div class="tag-wrap">
                        <div class="tag accent" v-for="tag in diary.keyword">
                            {{ tag }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. 중간 영역 (이미지, 삭제 버튼) -->
            <Image
                class="diary-image"
                :url="diary.image_url"
                width="calc(100% - 40px)"
                maxWidth="400px"
            />

            <!-- 3. 바텀시트 영역 -->
            <div class="bottom-container" :style="bottomTextColor">
                <div class="bottom-diary">
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
                            <Icon class="ic_crystal" />꿈을 통해 본 마음
                        </div>

                        <div class="bottom-diary-content-desc">
                            {{ diary.resolution }}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    </section>
</template>
<script setup>
const { getShareMorningdiary, getShareNightdiary } = useDiaryService();
const router = useRouter();
const route = useRoute();

const params = route.params;
const query = route.query;

const record = await useAsyncData(`content-${params.id}`, async () => {
    const res =
        query.type === "1"
            ? await getShareMorningdiary(params.id)
            : await getShareNightdiary(params.id);

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
    ogImage: () => record.data.value?.image_url,
    ogTitle: () => record.data.value?.diary_name,
    ogDescription: () => record.data.value?.content,
    twitterTitle: () => record.data.value?.diary_name,
    twitterDescription: () => record.data.value?.diary_name,
});
</script>
<script>
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
            isOpen: false,
        };
    },
    computed: {
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
        bottomSheetTitle() {
            let type = this.type === "1" ? "꿈 해석" : "일기";
            if (this.type === "2" && !this.isOpen) type = "일기 자세히"; // 일기의 경우, '자세히' 보기

            const open = !this.isOpen ? "보기" : "닫기";

            return `${type} ${open}`;
        },
    },
    async mounted() {
        const { getShareMorningdiary, getShareNightdiary } = useDiaryService();

        const id = this.$route.params.id;
        const type = this.$route.query.type;
        this.type = type;

        const res =
            type === "1"
                ? await getShareMorningdiary(id)
                : await getShareNightdiary(id);

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
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";
.header {
    background: none;
    border: none;
    justify-content: flex-end;

    .button {
        width: 100%;
        height: fit-content;
        padding: 0.8rem;

        /* b1/b1_med_16 */
        color: $vc-white;
        font-family: $font-medium;
        font-size: 16px;
        line-height: 160%; /* 25.6px */

        display: flex;
        gap: 20px;
    }
}

.container {
    // BottomSheet 높이: 108px =  calc(32px + (12px * 1.5) + 4px) + 40px + 14px;
    height: calc(100% - (60px));
    height: calc(100% - (60px + constant(safe-area-inset-top)));
    height: calc(100% - (60px + env(safe-area-inset-top)));
    padding: 2rem 0;
    overflow: scroll;

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
    // overflow: hidden;
    // text-overflow: ellipsis;
    display: flex;
    flex-direction: column;
    gap: 4px;

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
    font-size: 20px;
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
.diary-tags {
    margin-top: 0.5rem;
    .tag {
        font-size: 14px; // 1.2rem;;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.1);
        border: none;
    }
}

.bottom-diary {
    padding: 0 2rem;

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
            margin-bottom: 3rem;

            .tag-wrap {
                margin: 0 0 12px;
            }
        }
    }
}
.bottom-container {
    width: 100%;
}
</style>
