<template>
    <div class="header">
        <Icon class="ic_back_white" @click="this.$router.back()" />한 주
        돌아보기
    </div>

    <div class="contents">
        <div class="report-content report-content-1">
            <div class="report-content-1-title">
                <div v-if="generated_total_count < 5">
                    이번주에 <b>{{ 5 - generated_total_count }}개</b> 더
                    기록해주시면 <br />
                    월요일 아침에 돌아보기가 완성돼요!
                </div>
                <div v-else>
                    이번 한 주도 수고했어요 :&#41;<br />
                    <b>일요일 밤</b>에 돌아보기가 완성돼요!
                </div>
            </div>
            <div class="report-progress-wrap">
                <div
                    v-for="generated in generated_list"
                    class="report-progress"
                    :class="{ inactive: !generated }"
                >
                    <Icon class="ic_checked" v-if="generated" />
                    <Icon class="ic_edit" v-else />
                </div>
                <div
                    class="report-progress-result"
                    :class="{ inactive: generated_total_count < 5 }"
                >
                    <Icon class="ic_frame" />
                </div>
            </div>
            <Icon class="img_illust_night" />
        </div>
        <div class="report-content report-content-2">
            <div class="report-content-2-title">
                <Icon class="ic_box" />{{ user?.nickname }}님의 돌아보기
            </div>
            <div class="report-content-2-desc">
                하루하루 열심히 기록하신 꿈, 일기, 일정을 바탕으로 <br />
                일요일 밤에 한 주 돌아보기를 보내드려요.
            </div>

            <ReportItems
                :reports="reports"
                :list_count="list_count"
                @loadMore="loadMore"
            />

            <InfiniteLoading
                v-if="reports?.length"
                :first-load="false"
                :distance="1000"
                @infinite="loadMore"
            />
        </div>
    </div>
</template>

<script>
import ReportItems from "../../components/report/ReportItems.vue";
import Icon from "~/components/common/Icon.vue";
import InfiniteLoading from "v3-infinite-loading";

import { mapState } from "pinia";
import { useUserStore } from "~/store/user";

import { useReportService } from "../../services/report";

export default {
    name: "Report",
    components: { ReportItems, Icon, InfiniteLoading },
    computed: {
        ...mapState(useUserStore, ["user"]),
        generated_list() {
            const list = [false, false, false, false, false];
            for (let i = 0; i < 5; i++) {
                if (i >= this.generated_total_count) break;
                list[i] = true;
            }

            return list;
        },
    },
    data() {
        return {
            generated_total_count: 0,
            list_count: 0,
            reports: [],
            page: 1,
        };
    },
    async mounted() {
        const { getReportList } = useReportService();
        const res = await getReportList(this.page);

        if (res.success) {
            this.generated_total_count = res.data.generated_total_count;
            this.list_count = res.data.list_count;
            this.reports = res.data.reports;
        }
    },
    methods: {
        async loadMore() {
            if (this.reports.length < this.list_count) {
                // page +1 해서 호출
                this.page += 1;

                const { getReportList } = useReportService();
                const res = await getReportList(this.page);
                if (res.success) {
                    this.generated_total_count = res.data.generated_total_count;
                    this.list_count = res.data.list_count;
                    this.reports = [...this.reports, ...res.data.reports];
                }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.contents {
    padding-top: 60px;
    padding-top: calc(60px + constant(safe-area-inset-top));
    padding-top: calc(60px + env(safe-area-inset-top));

    color: #fff;
    background: linear-gradient(
        0deg,
        #000 -2.78%,
        #1e1538 81.7%,
        #151d38 112.23%
    );
}

.header {
    border: none;
    background-color: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(36px);

    color: var(--white, #fff);
    font-family: "Pretendard SemiBold";
    font-size: 16px;
    line-height: 150%; /* 24px */

    .ic_back_white {
        margin-right: 10px;
    }
}
.report-content {
    width: 100%;
    padding: 20px;
}

.report-content-1 {
    position: relative;
    background: linear-gradient(102deg, #282758 -1.8%, #291d4b 101.7%);
    min-height: 184px;

    .report-content-1-title {
        color: var(--white, #fff);
        /* h3/h3_reg_18 */
        font-family: "Pretendard";
        font-size: 18px;
        line-height: 160%; /* 28.8px */

        b {
            font-family: "Pretendard Bold";
        }
    }

    .img_illust_night {
        position: absolute;
        bottom: 0;
        right: 0;
    }

    .report-progress-wrap {
        display: flex;
        flex-wrap: wrap;
        align-items: center;

        gap: 6px;
        max-width: calc(100% - (160px - 20px));
        margin-top: 45px;
        box-sizing: border-box;

        .report-progress {
            width: 24px;
            height: 24px;
            border-radius: 8px;
            background: var(--indigo-500, #6366f1);

            display: flex;
            justify-content: center;
            align-items: center;
        }
        .report-progress.inactive {
            background: #5f5a7e;
        }

        .report-progress-result {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            background: linear-gradient(200deg, #a78bfa 9.08%, #a5b4fc 86.42%);
            box-shadow: 0px 9px 34px 0px rgba(204, 205, 227, 0.45);

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .report-progress-result.inactive {
            background: #5f5a7e;
            box-shadow: none;

            span {
                opacity: 0.25;
            }
        }
    }
}

.report-content-2 {
    .report-content-2-title {
        /* h3/h3_bold_18 */
        font-family: "Pretendard Bold";
        font-size: 18px;
        line-height: 160%; /* 28.8px */

        display: flex;
        gap: 12px;
        align-items: center;

        margin-top: 48px;
    }

    .report-content-2-desc {
        color: var(--gray-300, #d1d5db);

        /* c1/c1_reg_12 */
        font-family: Pretendard;
        font-size: 12px;
        line-height: 160%; /* 19.2px */

        margin-top: 10px;
    }

    .report-content-2-contents {
        margin: 20px 0;
    }
}
</style>
