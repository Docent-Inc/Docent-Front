<template>
    <div class="header">
        <div class="header-top">
            <div><span class="mypage-title">마이페이지</span></div>
            <button>
                <v-icon class="ic_setting">
                    <img src="~/assets/images/ic_setting.svg" />
                </v-icon>
            </button>
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
            <div :class="displayStatus.iconClass"></div>
            <p class="status-text">{{ displayStatus.message }}</p>
        </div>

        <!-- (2) 통계 영역 -->
        <div class="contents-header-3">
            <div class="count-area">
                <div v-if="isSkeleton" class="no-records-message"></div>
                <div :style="barStyles.dream" class="bar dream-bar">
                    <div v-if="total_MorningDiary_count > 0">
                        <span>꿈 기록</span>
                        <span>{{ total_MorningDiary_count }}</span>
                    </div>
                </div>
                <div :style="barStyles.diary" class="bar diary-bar">
                    <div v-if="total_NightDiary_count > 0">
                        <span>일기</span>
                        <span>{{ total_NightDiary_count }}</span>
                    </div>
                </div>
                <div :style="barStyles.memo" class="bar memo-bar">
                    <div v-if="total_Memo_count > 0">
                        <span>메모</span>
                        <span>{{ total_Memo_count }}</span>
                    </div>
                </div>
                <div
                    v-if="
                        !isSkeleton &&
                        total_MorningDiary_count +
                            total_NightDiary_count +
                            total_Memo_count ===
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

import InfiniteLoading from "v3-infinite-loading";
import ListDiary from "../../components/diary/ListDiary.vue";
import ListMemo from "../../components/diary/ListMemo.vue";
import ListItems from "../../components/diary/ListItems.vue";
import BoardItems from "../../components/diary/BoardItems.vue";
import Tags from "../../components/diary/Tags.vue";
import Starter from "../../components/diary/Starter.vue";

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
            "total_NightDiary_count",
            "total_MorningDiary_count",
            "total_Memo_count",
            "pageNo",
        ]),
        isSkeleton() {
            if (this.pageNo === 1 && this.list.length < 1) return true;
            else false;
        },
        highestCountCategory() {
            const counts = {
                dream: this.total_NightDiary_count,
                diary: this.total_MorningDiary_count,
                memo: this.total_Memo_count,
            };
            const maxCategory = Object.keys(counts).reduce((a, b) =>
                counts[a] > counts[b] ? a : b
            );

            const categoryInfo = {
                dream: {
                    iconClass: "ic_status_dream",
                    message: "꿈 f기록을 가장 많이 작성하셨어요!",
                },
                diary: {
                    iconClass: "ic_status_diary",
                    message: "일기를 가장 많이 작성하셨어요!",
                },
                memo: {
                    iconClass: "ic_status_memo",
                    message: "메모를 가장 많이 작성하셨어요!",
                },
                start: {
                    iconClass: "ic_status_start",
                    message: "아직 기록을 하지 않았어요!",
                },
                default: {
                    iconClass: "ic_status_default",
                    message: "",
                },
            };

            // TODO: 이미지 사이즈 조정
            if (this.isSkeleton) return categoryInfo["default"];
            else
                return counts[maxCategory] > 0
                    ? categoryInfo[maxCategory]
                    : categoryInfo["start"];
        },
        displayStatus() {
            return this.highestCountCategory;
        },
        barStyles() {
            const total =
                this.total_NightDiary_count +
                this.total_MorningDiary_count +
                this.total_Memo_count;

            // 비율을 계산하고 스타일 객체를 반환합니다.
            const calculateStyle = (count) => {
                const percentage = total ? (count / total) * 100 : 0;
                return { width: `${percentage}%` };
            };

            return {
                dream: calculateStyle(this.total_MorningDiary_count),
                diary: calculateStyle(this.total_NightDiary_count),
                memo: calculateStyle(this.total_Memo_count),
            };
        },
    },
    async mounted() {
        try {
            this.setPageNo(1);
            await this.getGalleryList();
        } catch (e) {
            console.log(e);
        }
    },
    methods: {
        ...mapActions(useDiaryStore, [
            "setType",
            "changeMode",
            "getGalleryList",
            "setPageNo",
        ]),
        loadMore() {
            // console.log(`loadmore ${this.list.length}/${this.totalCounts}`);
            if (this.list.length < this.totalCounts) {
                this.getGalleryList();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.header {
    padding: 2rem 2.5rem;

    .header-top {
        width: 100%;
        display: flex;
        justify-content: space-between;
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

    padding: 1.31rem 2.35rem;
    background: #f8f8f8;

    .contents-header-1 {
        width: 100%;
        margin-top: 16px;
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
        width: 100%;
        height: 40px;
        display: flex;
        color: var(--gray-400, #9ca3af);
        font-family: Pretendard;
        font-size: 12px;
        line-height: 160%;
        .status-text {
            margin-left: 12px;
            display: flex;
            width: 206px;
            height: 36px;
            flex-direction: column;
            justify-content: center;
            flex-shrink: 0;
        }
    }
    .contents-header-3 {
        margin-top: 12px;
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
            width: 206px;
            height: 36px;
            flex-direction: column;
            justify-content: center;
            flex-shrink: 0;
            color: var(--gray-400, #9ca3af);
            text-align: center;
            font-family: Pretendard;
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
.ic_status_diary,
.ic_status_dream,
.ic_status_memo,
.ic_status_start {
    font-size: 100%;
    width: 13.2rem;
    height: 3.6rem;
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
</style>
