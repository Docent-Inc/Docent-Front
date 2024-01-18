<template>
    <div class="header">
        <div class="header-top">
            <span class="mypage-title">마이페이지</span>
            <v-icon class="ic_setting" @click="goSetting" />
        </div>
    </div>
    <div class="contents">
        <!-- (1) 프로필 영역 -->
        <div class="contents-header-1" @click="handleCloseCalendarDetail">
            <p>
                <span class="nickname-color">{{ user?.nickname }}</span
                >님의 기록공간
            </p>
            <!--            <v-icon-->
            <!--                :class="[mode === 0 ? 'ic_list' : 'ic_board', !type && 'blind']"-->
            <!--                @click="changeMode()"-->
            <!--            />-->
        </div>

        <!-- (2) 통계 영역 -->
        <div
            class="contents-header-2"
            v-if="highestCountCategory"
            @click="handleCloseCalendarDetail"
        >
            <Icon :class="highestCountCategory.iconClass" />
            <p class="status-text">{{ highestCountCategory.message }}</p>
        </div>

        <!-- (3) 콘텐츠 영역 -->
        <div class="contents-header-4">
            <Tags
                :tags="[
                    { name: '캘린더', count: null },
                    { name: '꿈', count: ratio.morning_diary_count },
                    { name: '일기', count: ratio.night_diary_count },
                    { name: '메모', count: ratio.memo_count },
                ]"
                @select="(idx) => setType(idx)"
                :selected="type"
            />
        </div>

        <div
            class="board-contents"
            :class="{
                calendar: type === 0 || $route.query.tab === 'calendar',
            }"
        >
            <CalendarMain
                v-if="type === 0"
                :viewType="viewType"
                :updateViewType="updateViewType"
            />
            <div v-else class="others">
                <!-- <ListItems :type="type" v-if="mode === 0" /> -->
                <BoardItems :show="type === 1" :type="1" />
                <BoardItems :show="type === 2" :type="2" />
                <BoardItems :show="type === 3" :type="3" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useMypageStore } from "~/store/mypage";
import { useUserStore } from "~/store/user";

import ListItems from "../../components/diary/ListItems.vue";
import BoardItems from "../../components/diary/BoardItems.vue";
import Tags from "../../components/diary/Tags.vue";
import Icon from "~/components/common/Icon.vue";
import CalendarMain from "~/components/calendar/CalendarMain.vue";

export default {
    name: "Mypage",
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    components: {
        Tags,
        BoardItems,
        ListItems,
        Icon,
        CalendarMain,
    },
    data() {
        return {
            maxWidth: 214,
            isChecked: false,
            viewType: "monthly",
            infiniteLoadingKey: 0,
            isDefaultTab: false,
        };
    },
    computed: {
        ...mapState(useUserStore, ["user"]),
        ...mapState(useMypageStore, ["type", "ratio", "mode"]),
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

            if (!this.ratio.max_category) {
                return categoryInfo[5];
            }
            return categoryInfo[this.ratio.max_category];
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
    created() {
        const { tab, date } = this.$route.query;
        switch (tab) {
            case "calendar":
                if (date) {
                    break;
                }
                this.setType(0);
                break;
            case "dream":
                this.setType(1);
                break;
            case "diary":
                this.setType(2);
                break;
            case "memo":
                this.setType(3);
                break;
            default:
                this.isDefaultTab = true;
                break;
        }
    },
    mounted() {
        this.getRatio();
    },
    methods: {
        ...mapActions(useMypageStore, ["setType", "changeMode", "getRatio"]),
        goSetting() {
            this.$router.push(`/setting`);
        },
        updateViewType(newViewType) {
            this.viewType = newViewType;
        },
        handleCloseCalendarDetail(event) {
            this.$eventBus.$emit("toggle-view-type", event);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

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

    // padding: 1.31rem 0;
    background: #ffffff;

    .contents-header-1 {
        width: 100%;
        margin-top: 16px;
        padding: 0 2rem;
        height: 32px;

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
        margin: 2rem 0 3rem 0;
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
.board-contents {
    width: 100%;
    height: calc(100% - 48px - 56px - 40px - 20px);
    margin-bottom: -2rem;
    box-sizing: border-box;
    &.calendar {
        height: calc(100% + 2rem);
    }

    .others {
        height: 100%;
        min-height: 100%;
        max-height: fit-content;
        background: $gradient_bg_light;
    }
}
.blind {
    visibility: hidden;
}
</style>
