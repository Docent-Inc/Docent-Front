<template>
    <div class="header">한 주 돌아보기</div>

    <div class="contents">
        <div class="report-content report-content-1">
            <div class="report-content-1-title">
                이번주에 <b>2개</b> 더 기록해주시면 <br />
                월요일 아침에 돌아보기가 완성돼요!
            </div>
            <div class="report-progress-wrap">
                <div
                    v-for="progress in progressList"
                    class="report-progress"
                    :class="{ inactive: !progress }"
                >
                    <Icon class="ic_checked" v-if="progress" />
                    <Icon class="ic_edit" v-else />
                </div>
                <div class="report-progress-result">
                    <Icon class="ic_frame" />
                </div>
            </div>
            <Icon class="img_illust_night" />
        </div>
        <div class="report-content report-content-2">
            <div class="report-content-2-title">
                <Icon class="ic_box" />서준님의 돌아보기
            </div>
            <div class="report-content-2-desc">
                하루하루 열심히 기록하신 꿈, 일기, 일정을 바탕으로 <br />
                일요일 밤에 한 주 돌아보기를 보내드려요.
            </div>

            <ReportItems :itemList="itemList" />
        </div>
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "~/store/user";
import { useGenerateService } from "../../services/generate";
import ReportItems from "../../components/report/ReportItems.vue";
import Icon from "~/components/common/Icon.vue";

export default {
    name: "Report",
    setup() {
        definePageMeta({
            layout: "main-dark",
        });
    },
    components: { ReportItems, Icon },
    computed: {
        ...mapState(useUserStore, ["user"]),
    },
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
    // height: calc(100% - (60px));
    // height: calc(100% - (60px + constant(safe-area-inset-top)));
    // height: calc(100% - (60px + env(safe-area-inset-top)));

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
