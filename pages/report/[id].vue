<template>
    <div class="header"><Icon class="ic_back_white" />한 주 돌아보기</div>
    <div class="contents">
        <Icon class="img_blur_elipsis" />

        <div class="report-detail-title">이번주 서준님은,</div>
        <div class="report-detail-date">2023년 10월 2일 ~ 2023년 10월 8일</div>
        <div class="report-detail-desc">
            한 주 동안의 기록을 바탕으로 그림을 그려보았어요
        </div>
        <img class="report-detail-img" />

        <div class="report-detail-sections">
            <div class="report-detail-section">
                <div class="report-detail-section-title">
                    <Icon class="ic_memo" />주요 키워드
                </div>
                <div class="tag-wrap row">
                    <div class="tag primary">스타트업</div>
                    <div class="tag primary">스트레스 관리</div>
                    <div class="tag primary">도슨트</div>
                    <div class="tag primary">서비스 기획</div>
                    <div class="tag primary">휴식</div>
                </div>
                <!-- <div class="report-detail-section-desc"></div> -->
            </div>
            <div class="report-detail-section">
                <div class="report-detail-section-title">
                    <Icon class="ic_ballon" />마음상태 분석
                </div>
                <div class="report-detail-section-desc">
                    서준님께서는 최근 몇 주 동안의 꿈을 통해 생활에 대한
                    스트레스를 받고 계시며 불안과 혼란을 느끼고 있는 것으로
                    보입니다. 이러한 상황은 서준님의 스타트업 활동과 관련된
                    의사결정에 큰 영향을 미치고 있습니다. 그러나 일기를 통해
                    보이는 의지와 역량이 이러한 상황을 이겨낼 수 있을 것으로
                    보입니다.
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
                            스타트업 대표로 활동 <br />
                            <br />
                            GCS의 프로그램에 참여하여 공덕의 디캠프 및 서울 창업
                            <br />
                            <br />
                            허브에 방문 부산 여행 <br />
                        </div>
                    </div>
                    <div class="report-activity-box violet">
                        <div class="report-activity-title">내향적 활동</div>
                        <div class="report-activity-desc">
                            스타트업 대표로 활동 <br />
                            <br />
                            GCS의 프로그램에 참여하여 공덕의 디캠프 및 서울 창업
                            <br />
                            <br />
                            허브에 방문 부산 여행 <br />
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
                    <div class="tag blue">높은 열정과 확고한 의지</div>
                </div>
                <div class="report-detail-section-desc">
                    스타트업 성과에 대한 높은 열정과 확고한 의지를
                    보여주셨습니다. 다양한 이야기를 나누며 스타트업 성공에 대한
                    다양한 관점을 얻으셨습니다.주변 사람들의 도움을 적극적으로
                    받으며, 이들와 함께 성장하려는 노력을 보이셨습니다.
                </div>
            </div>

            <div class="report-detail-section">
                <div class="report-detail-section-title">
                    <Icon class="ic_sweat" />일주일 간 이런 일 때문에 힘들지
                    않으셨나요?
                </div>
                <div class="tag-wrap">
                    <div class="tag red">높은 열정과 확고한 의지</div>
                </div>
                <div class="report-detail-section-desc">
                    스타트업 성과에 대한 높은 열정과 확고한 의지를
                    보여주셨습니다. 다양한 이야기를 나누며 스타트업 성공에 대한
                    다양한 관점을 얻으셨습니다.주변 사람들의 도움을 적극적으로
                    받으며, 이들와 함께 성장하려는 노력을 보이셨습니다.
                </div>
            </div>
            <div class="report-detail-section">
                <div class="report-detail-section-title">
                    <Icon class="ic_rocket" />추천활동
                </div>
                <div class="tag-wrap col">
                    <div class="tag primary big">
                        레크리에이션 활동이나 휴가를 통한 휴식 시간을 가져보시는
                        것이 어떠세요?
                    </div>
                    <div class="tag primary big">
                        레크리에이션 활동이나 휴가를 통한 휴식 시간을 가져보시는
                        것이 어떠세요?
                    </div>
                    <div class="tag primary big">
                        레크리에이션 활동이나 휴가를 통한 휴식 시간을 가져보시는
                        것이 어떠세요?
                    </div>
                    <div class="tag primary big">
                        레크리에이션 활동이나 휴가를 통한 휴식 시간을 가져보시는
                        것이 어떠세요?
                    </div>
                    <div class="tag primary big">
                        레크리에이션 활동이나 휴가를 통한 휴식 시간을 가져보시는
                        것이 어떠세요?
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
import { mapState } from "pinia";
import Icon from "~/components/common/Icon.vue";

export default {
    name: "Report",
    setup() {
        definePageMeta({
            layout: "dark",
        });
    },
    components: { Icon },
    computed: {},
    data() {
        return {
            data: {
                create_date: "2023-08-29T14:36:18",
            },
            name: "",
            status: "LOADING", // LOADING, SUCCESS, NODATA
            progressList: [true, true, false, false, false],
            itemList: [1, 2],
        };
    },
    async mounted() {},
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
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 8px;
    background: #fff;
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
        flex: 1;
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
