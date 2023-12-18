<template>
    <section
        class="report"
        :class="dynamicBackground"
        @click="this.$router.push('/report')"
    >
        <div class="report-content-1-title">
            <div v-html="processedText(dynamicMessage)"></div>
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
                :class="{ inactive: generated_total_count <= 5 }"
            >
                <Icon class="ic_frame" />
            </div>
        </div>
        <Icon class="img_illust_night" />
        <span class="report-dot" v-if="isLastestReportUnread"></span>
    </section>
</template>

<script>
import { getHourType, parseKoreanDate } from "@/utils/utils";
import Icon from "~/components/common/Icon.vue";
import { useReportService } from "~/services/report";

export default {
    name: "Report",
    components: { Icon },
    data() {
        return {
            generated_total_count: 0,
            reports: [],
        };
    },
    computed: {
        generated_list() {
            const list = [false, false, false, false, false];
            for (let i = 0; i < 5; i++) {
                if (i >= this.generated_total_count) break;
                list[i] = true;
            }

            return list;
        },
        dynamicBackground() {
            const timeType = getHourType(new Date().getHours());
            switch (timeType) {
                case 1:
                    return "daytime";
                case 4:
                    return "night";
                default:
                    return "dawn";
            }
        },
        dynamicMessage() {
            const now = this.$dayjs();

            // 조건 충족
            if (this.generated_total_count >= 5) {
                // 1) 일요일 19시-20시
                const isSunday19to20 =
                    now.day() === 0 && now.hour() >= 19 && now.hour() <= 20;
                if (isSunday19to20) {
                    return `*한 주 돌아보기를 생성하고 있어요* \n일요일 20시에 돌아보기가 완성돼요!`;
                }

                // 2) 지난주 확인 안 한 돌아보기 있을 때
                if (this.isLastestReportUnread) {
                    return `*이번주 돌아보기가 완성되었어요!* \n확인해보러 가볼까요?`;
                }

                return `*이번주도 수고했어요!* \n일요일 20시에 돌아보기가 완성돼요!`;
            }

            // 조건 미충족
            return `이번 주에 *${
                5 - this.generated_total_count
            }개* 더 기록해주시면 \n일요일 밤에 돌아보기가 완성돼요!`;
        },
        /** 지난주 돌아보기 확인 여부 */
        isLastestReportUnread() {
            const now = this.$dayjs();

            if (this.reports.length > 0) {
                const report = this.reports[0];
                const lastestDate = this.$dayjs(
                    parseKoreanDate(report.create_date),
                );

                // 가장 최신 보고서가 지난주 보고서인지 확인
                const isExistLastRepost =
                    now
                        .subtract(1, "week")
                        .startOf("week")
                        .isBefore(lastestDate) &&
                    now.endOf("week").isAfter(lastestDate);

                return isExistLastRepost && !report.is_read;
            }

            return false;
        },
    },
    async mounted() {
        const { getReportList } = useReportService();
        const res = await getReportList(1);

        if (res.success) {
            this.generated_total_count = res.data.generated_total_count;
            this.reports = res.data.reports;
        }
    },
    methods: {
        processedText(text) {
            return text.replace(/\*(.*?)\*/g, "<b>$1</b>");
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
@import "@/assets/scss/mixins.scss";

.report {
    position: relative;
    padding: 1.5rem;
    padding-bottom: 3rem;
    width: calc(100% - (2rem * 2));
    margin: 0 auto;

    color: $vc-white;
    background: $gradient_dawn_dusk;
    border-radius: $border-radius-default;
    box-shadow: 0px 12px 34px 0px rgba(146, 151, 255, 0.3);

    cursor: pointer;

    @media screen and (max-width: 360px) {
        padding-bottom: 1.5rem;
        min-height: 0;
    }

    // 이미지 고려 min-width, height
    min-width: calc(257px - 97px);
    min-height: calc(137px + 5rem);

    .img_illust_night {
        position: absolute;
        bottom: 0;
        right: 0;
        border-radius: 0 0 $border-radius-default 0;

        @media screen and (max-width: 360px) {
            visibility: hidden;
        }
    }
}

.report-progress-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    gap: 0.3rem;
    // max-width: calc(100% - (160px - 20px));
    margin-top: 1.3rem;
    box-sizing: border-box;

    @media screen and (max-width: 360px) {
        max-width: 100%;
        gap: 0.4rem;
    }

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
        border-radius: 10px;
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

.report-content-1-title {
    color: var(--white, #fff);
    /* h3/h3_reg_18 */
    font-family: "Pretendard";
    font-size: 18px;
    line-height: 160%; /* 28.8px */
    white-space: pre-wrap;

    b {
        font-family: "Pretendard Bold";
    }

    @media screen and (max-width: 360px) {
        font-size: 90%;
    }
}

.report-dot {
    width: 8px;
    height: 8px;
    background: var(--red-400, #f87171);
    border-radius: 50%;
    position: absolute;
    top: 0;
    right: 0;
    margin: 8px;
}
</style>
