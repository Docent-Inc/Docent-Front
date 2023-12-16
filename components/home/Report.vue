<template>
    <section class="report" :class="dynamicBackground">
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
    </section>
</template>

<script>
import { getHourType } from "@/utils/utils";

export default {
    name: "Report",
    data() {
        return {
            generated_total_count: 5,
            list_count: 0,
            reports: [],
            page: 1,
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
    },
    mounted() {},
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

    @media screen and (max-width: 360px) {
        padding-bottom: 1.5rem;
        min-height: 0;
    }

    // 이미지 고려 min-width, height
    min-width: calc(257px - 97px);
    min-height: calc(137px + 4.75rem);

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

    b {
        font-family: "Pretendard Bold";
    }

    @media screen and (max-width: 360px) {
        font-size: 90%;
    }
}
</style>
