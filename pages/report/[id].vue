<template>
    <div class="header"><BackBtn :is-dark="true" />마음 상태 보고서</div>
    <div class="contents">
        <Icon class="img_blur_elipsis" />

        <div class="report-detail-title">이번주 {{ user?.nickname }}님은,</div>
        <div class="report-detail-date">
            {{ data.period.start_date }} ~ {{ data.period.end_date }}
        </div>
        <div class="report-detail-desc">
            한 주 동안의 기록을 바탕으로 그림을 그려보았어요
        </div>
        <Image class="report-detail-img" :url="data.image_url" width="100%" />

        <div class="report-detail-sections">
            <div class="report-detail-section">
                <div class="report-detail-section-title">
                    <Icon class="ic_memo" />주요 키워드
                </div>
                <div class="tag-wrap row">
                    <div
                        class="tag primary"
                        v-for="keyword in content.keywords"
                    >
                        {{ keyword }}
                    </div>
                </div>
            </div>
            <div class="report-detail-section">
                <div class="report-detail-section-title">
                    <Icon class="ic_ballon" />마음상태 분석
                </div>
                <div class="report-detail-section-desc">
                    {{ content.mental_state }}
                </div>
            </div>
            <div class="report-detail-section">
                <div class="report-detail-section-title">
                    <Icon class="ic_star" />외향적 활동과 내향적 활동
                </div>
                <div class="report-activities">
                    <div class="report-activity-box">
                        <div class="report-activity-title">외향적 활동</div>
                        <div class="report-activity-desc">
                            {{ content.extroverted_activities.join("\n\n") }}
                        </div>
                    </div>
                    <div class="report-activity-box violet">
                        <div class="report-activity-title">내향적 활동</div>
                        <div class="report-activity-desc">
                            {{ content.introverted_activities.join("\n\n") }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="report-detail-section">
                <div class="report-detail-section-title">
                    <Icon class="ic_hands" />일주일 간 발견한 긍정적인
                    부분이에요!
                </div>
                <div class="tag-wrap">
                    <div class="tag blue">
                        {{ content.positives.main_keyword }}
                    </div>
                </div>
                <div class="report-detail-section-desc">
                    {{ content.positives.comment }}
                </div>
            </div>

            <div class="report-detail-section">
                <div class="report-detail-section-title">
                    <Icon class="ic_sweat" />일주일 간 이런 일 때문에 힘들지
                    않으셨나요?
                </div>
                <div class="tag-wrap">
                    <div class="tag red">
                        {{ content.negatives.main_keyword }}
                    </div>
                </div>
                <div class="report-detail-section-desc">
                    {{ content.negatives.comment }}
                </div>
            </div>
            <div class="report-detail-section">
                <div class="report-detail-section-title">
                    <Icon class="ic_rocket" />추천활동
                </div>
                <div class="tag-wrap col">
                    <div
                        class="tag primary big left"
                        v-for="rec in content.recommendations"
                    >
                        {{ rec }}
                    </div>
                </div>
            </div>
        </div>

        <div class="report-detail-footer">
            <Icon class="logo_full" />
            <div class="divider"></div>
            <div>다음 주는 어떻게 보내고 싶으신가요?</div>
            <Icon class="img_blur_elipsis" />
        </div>
    </div>
</template>

<script>
import Icon from "~/components/common/Icon.vue";
import { mapState } from "pinia";
import { useUserStore } from "~/store/user";
import { useReportService } from "../../services/report";
import Image from "~/components/common/Image.vue";
import BackBtn from "~/components/common/buttons/BackBtn.vue";

export default {
    name: "Report",
    setup() {
        definePageMeta({
            layout: "dark",
        });
    },
    components: { Icon, Image, BackBtn },
    computed: { ...mapState(useUserStore, ["user"]) },
    data() {
        return {
            data: {
                period: {
                    start_date: "",
                    end_date: "",
                },
                image_url: "",
            },
            content: {
                extroverted_activities: [],
                introverted_activities: [],
                mental_state: "",
                negatives: { comment: "", main_keyword: "" },
                positives: { comment: "", main_keyword: "" },
                recommendations: [],
                keywords: [],
            },
        };
    },
    async mounted() {
        const id = this.$route.params.id;
        const { getReportDetail } = useReportService();
        const res = await getReportDetail(id);

        if (res.success) {
            Object.assign(this.data, res.data);
            Object.assign(this.content, res.data.content);
        }
    },
};
</script>

<style lang="scss" scoped>
.contents {
    position: relative;
    height: calc(100%);
    height: calc(100% - (constant(safe-area-inset-top)));
    height: calc(100% - (env(safe-area-inset-top)));

    margin-top: 60px;
    margin-top: calc(60px + constant(safe-area-inset-top));
    margin-top: calc(60px + env(safe-area-inset-top));

    padding: 28px 20px;

    color: #fff;
    background: linear-gradient(
        0deg,
        #000 -2.78%,
        #1e1538 81.7%,
        #151d38 112.23%
    );

    overflow-y: scroll;
}

.contents > .img_blur_elipsis {
    width: 290px;
    height: 290px;

    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
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

//// Report CSS
.report-detail-title {
    color: var(--white, #fff);

    /* h1/h1_bold_24 */
    font-family: "Pretendard Bold";
    font-size: 24px;
    line-height: 150%; /* 2.25rem */
}

.report-detail-date {
    color: var(--CTA_accent, #9398ff);

    /* b2/b2_med_14 */
    font-family: "Pretendard Medium";
    font-size: 14px;
    line-height: 160%; /* 22.4px */

    margin-top: 8px;
}

.report-detail-desc {
    color: var(--gray-400, #9ca3af);

    /* b2/b2_reg_14 */
    font-family: "Pretendard";
    font-size: 14px;
    line-height: 160%; /* 22.4px */
}

.report-detail-img {
    border-radius: 8px;
    margin-top: 32px;
}

.report-detail-sections {
    margin: 45px 0;
    display: flex;
    flex-direction: column;
    gap: 64px;

    .report-detail-section-title {
        color: var(--white, #fff);
        font-family: "Pretendard SemiBold";
        font-size: 16px;
        line-height: 150%; /* 24px */

        display: flex;
        gap: 12px;
    }

    .report-detail-section-desc {
        margin-top: 12px;

        color: var(--gray-400, #9ca3af);

        /* b2/b2_reg_14 */
        font-family: "Pretendard";
        font-size: 14px;
        line-height: 160%; /* 22.4px */
    }
}

.report-detail-footer {
    position: relative;
    min-height: 236px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    margin: 48px 0 68px;

    color: var(--white, #fff);

    /* h2/h2_bold_20 */
    font-family: "Pretendard Bold";
    font-size: 20px;
    line-height: 150%; /* 30px */
    text-align: center;

    .img_blur_elipsis {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.report-activities {
    width: 100%;
    display: flex;
    gap: 12px;
    margin-top: 16px;

    .report-activity-box {
        width: 50%;
        border-radius: 8px;
        background: rgba(217, 217, 217, 0.11);

        .report-activity-title {
            border-radius: 8px 8px 0px 0px;
            background: var(--indigo-400, #6568fe);
            padding: 8px 0px;
            text-align: center;

            color: var(--white, #fff);
            text-align: center;

            /* b2/b2_med_14 */
            font-family: "Pretendard Medium";
            font-size: 14px;
            line-height: 160%; /* 22.4px */
        }

        .report-activity-desc {
            padding: 20px 12px;

            color: var(--indigo-400, #6568fe);

            /* b2/b2_bold_14 */
            font-family: "Pretendard Bold";
            font-size: 14px;
            line-height: 160%; /* 22.4px */

            white-space: pre-wrap;
        }
    }

    .report-activity-box.violet {
        .report-activity-title {
            background: var(--violet-500, #8b5cf6);
        }

        .report-activity-desc {
            color: var(--violet-400, #a78bfa);
        }
    }
}
</style>
