<template>
    <div class="header">
        <div class="header-top">
            <span class="mypage-title">마이페이지</span>
            <v-icon class="ic_setting" @click="goSetting" />
        </div>
    </div>
    <div class="contents">
        <!-- (1) 프로필 영역 -->
        <div class="contents-header-1">
            <p>
                <span class="nickname-color">{{ user?.nickname }}</span
                >님의 기록공간
            </p>
            <v-icon
                :class="mode === 0 ? 'ic_list' : 'ic_board'"
                @click="changeMode()"
            />
        </div>
        <div class="contents-header-2" v-if="highestCountCategory">
            <Icon :class="highestCountCategory.iconClass" />
            <p class="status-text">{{ highestCountCategory.message }}</p>
        </div>

        <!-- (2) 통계 영역 -->
        <div class="contents-header-3">
            <div class="count-area">
                <div v-if="isSkeleton" class="bg_count_area_default"></div>
                <div :style="barStyles.dream" class="bar dream-bar">
                    <div v-if="ratio.morning_diary_ratio > 0">
                        <span>꿈</span>
                        <span>{{ ratio.morning_diary_count }}</span>
                    </div>
                </div>
                <div :style="barStyles.diary" class="bar diary-bar">
                    <div v-if="ratio.night_diary_ratio > 0">
                        <span>일기</span>
                        <span>{{ ratio.night_diary_count }}</span>
                    </div>
                </div>
                <div :style="barStyles.memo" class="bar memo-bar">
                    <div v-if="ratio.memo_ratio > 0">
                        <span>메모</span>
                        <span>{{ ratio.memo_count }}</span>
                    </div>
                </div>
                <div
                    v-if="
                        !isSkeleton &&
                        ratio.morning_diary_count +
                            ratio.night_diary_count +
                            ratio.memo_count ===
                            0
                    "
                    class="no-records-message"
                >
                    <span>기록의 종류에 따라 그래프가 채워져요.</span>
                </div>
            </div>
        </div>
        <!-- (3) 콘텐츠 영역 -->
        <div class="contents-header-4">
            <Tags
                :tags="['전체', '꿈', '일기', '메모']"
                @select="(idx) => setType(idx)"
                :selected="type"
            />
        </div>
        <div v-if="isSkeleton"></div>
        <div v-else-if="list?.length > 0">
            <ListItems :list="list" v-if="mode === 0" />
            <BoardItems :list="list" v-else />
        </div>
        <Starter v-else />

        <InfiniteLoading
            v-if="list?.length"
            :first-load="false"
            :distance="1000"
            :top="true"
            @infinite="loadMore"
        />
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useDiaryStore } from "~/store/diary";
import { useUserStore } from "~/store/user";
import { useDiaryService } from "~/services/diary";

import InfiniteLoading from "v3-infinite-loading";
import ListDiary from "../../components/diary/ListDiary.vue";
import ListMemo from "../../components/diary/ListMemo.vue";
import ListItems from "../../components/diary/ListItems.vue";
import BoardItems from "../../components/diary/BoardItems.vue";
import Tags from "../../components/diary/Tags.vue";
import Starter from "../../components/diary/Starter.vue";
import Icon from "~/components/common/Icon.vue";

export default {
    name: "Gallery",
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    components: {
        Starter,
        ListDiary,
        ListMemo,
        InfiniteLoading,
        Tags,
        BoardItems,
        ListItems,
        Icon,
    },
    data() {
        return {
            maxWidth: 214,
        };
    },
    watch: {
        type() {
            this.setPageNo(1);
            this.getGalleryList();
        },
    },
    computed: {
        ...mapState(useUserStore, ["user"]),
        ...mapState(useDiaryStore, [
            "type",
            "mode",
            "list",
            "totalCounts",
            "pageNo",
            "ratio",
        ]),
        isSkeleton() {
            if (this.pageNo === 1 && this.list.length < 1) return true;
            else false;
        },
        highestCountCategory() {
            const categoryInfo = [
                {
                    iconClass: "ic_status_start",
                    message: "아직 기록을 하지 않았어요!",
                },
                {
                    iconClass: "ic_status_dream",
                    message: "꿈 기록을 가장 많이 작성하셨어요!",
                },
                {
                    iconClass: "ic_status_diary",
                    message: "일기를 가장 많이 작성하셨어요!",
                },
                {
                    iconClass: "ic_status_memo",
                    message: "메모를 가장 많이 작성하셨어요!",
                },
                {
                    iconClass: "ic_status_same",
                    message: "기록의 수가 비슷해요!",
                },
                {
                    iconClass: "ic_status_default",
                    message: "",
                },
            ];

            if (this.isSkeleton) return categoryInfo[5];
            else return categoryInfo[this.ratio.max_category];
        },
        barStyles() {
            return {
                dream: {
                    width: `${this.ratio.morning_diary_ratio}%`,
                    "min-width":
                        this.ratio.morning_diary_ratio > 0 ? "20%" : "0",
                },
                diary: {
                    width: `${this.ratio.night_diary_ratio}%`,
                    "min-width": this.ratio.night_diary_ratio > 0 ? "20%" : "0",
                },
                memo: {
                    width: `${this.ratio.memo_ratio}%`,
                    "min-width": this.ratio.memo_ratio > 0 ? "20%" : "0",
                },
            };
        },
    },
    async mounted() {
        this.setPageNo(1);
        this.getRatio();
        this.getGalleryList();
    },
    methods: {
        ...mapActions(useDiaryStore, [
            "setType",
            "changeMode",
            "getGalleryList",
            "setPageNo",
            "getRatio",
        ]),
        loadMore() {
            console.log(`loadmore ${this.list.length}/${this.totalCounts}`);
            if (this.list.length < this.totalCounts) {
                this.setPageNo(this.pageNo + 1);
                this.getGalleryList();
            }
        },
        goSetting() {
            this.$router.push(`/setting`);
        },
    },
};
</script>

<style lang="scss" scoped>
.header {
    padding: 2rem 2rem;

    .header-top {
        width: 100%;
        height: 48px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .mypage-title {
        display: flex;
        width: 282px;
        height: 24px;
        flex-direction: column;
        justify-content: center;
        flex-shrink: 0;

        color: var(--gray-800, #1f2937);
        font-family: "Pretendard SemiBold";
        font-size: 16px;
        line-height: 150%; /* 24px */
    }
}
.contents {
    width: 100%;
    height: calc(100% - (60px));
    height: calc(100% - (60px + constant(safe-area-inset-top)));
    height: calc(100% - (60px + env(safe-area-inset-top)));

    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));

    padding: 1.31rem 0;
    background: #f8f8f8;

    .contents-header-1 {
        width: 100%;
        margin-top: 16px;
        padding: 0 2rem;

        display: flex;
        justify-content: space-between;
        font-family: "Pretendard Bold";
        font-size: 24px;
        line-height: 100%;
        color: var(--gray-700, #374151);
        .nickname-color {
            color: var(--indigo-500, #6366f1);
        }
    }

    .contents-header-2 {
        margin-top: 36px;
        padding: 0 2rem;

        width: 100%;
        display: flex;
        color: var(--gray-400, #9ca3af);
        font-family: "Pretendard";
        font-size: 12px;
        line-height: 160%;

        display: flex;
        align-items: center;
        gap: 12px;
    }
    .contents-header-3 {
        margin-top: 12px;
        padding: 0 2rem;
        .count-area {
            display: flex;
            width: 100%;
            height: 40px;
            background-color: #e5e7eb;
            border-radius: 8px;
            overflow: hidden;
            justify-content: center;
            align-items: center;
        }

        .no-records-message {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            font-family: "Pretendard";
            font-size: 12px;
            line-height: 160%;
        }

        .bar {
            height: 100%;
            text-align: center;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            > div {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 20px;
                text-align: center;
                width: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                span:first-child {
                    color: var(--white, #fff);
                    text-align: center;
                    font-family: Pretendard;
                    font-size: 11px;
                    line-height: 160%;
                    display: inline-block;
                    margin-right: 4px;
                }

                span:last-child {
                    color: var(--white, #fff);
                    text-align: center;
                    font-family: "Pretendard Bold";
                    font-size: 16px;
                    line-height: 160%;
                    display: inline-block;
                }
            }
        }
    }
    .contents-header-4 {
        margin-top: 24px;
    }
}
.ic_list,
.ic_board {
    font-size: 100%;
    width: 6.4rem;
    height: 3.2rem;
}
.dream-bar {
    background-color: var(--indigo-500, #6366f1);
}
.diary-bar {
    background-color: var(--CTA_accent, #9398ff);
}
.memo-bar {
    background-color: var(--indigo-300, #a5b4fc);
}
.ic_setting {
    width: 3.2rem;
    height: 3.2rem;
}
</style>
