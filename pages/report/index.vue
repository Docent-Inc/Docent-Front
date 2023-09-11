<template>
    <div class="contents">
        <div class="title">서준 님의 깊은 곳이에요</div>

        <div class="report-stat">
            <img :src="IMG" />
        </div>
        <div class="report-keyword">
            <div>Key Word</div>
            <div>{{ result.statistics[1].join(", ") }}</div>
        </div>

        <div class="report-content">
            <div class="report-title">외향적 활동</div>
            <div
                class="report-desc"
                v-for="extro in result.extro_list"
                :key="extro"
            >
                • {{ extro }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">내향적 활동</div>
            <div v-for="intro in result.intro_list" :key="intro">
                • {{ intro }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">긍정적인 부분 3개</div>
            <div v-for="positive in result.positives" :key="positive">
                • {{ positive }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">부정적인 부분 3개</div>
            <div v-for="negative in result.negatives" :key="negative">
                • {{ negative }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">추천</div>
            <div
                v-for="recomendation in result.recommendations"
                :key="recomendation"
            >
                • {{ recomendation }}
            </div>
        </div>
    </div>
</template>

<script>
import { useGenerateService } from "../../services/generate";
import TEMPSTATISCTICS from "../../assets/images/img_statistics.svg";

export default {
    name: "Report",
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    data() {
        return {
            IMG: TEMPSTATISCTICS,
            result: {
                extro_list: ["산책하기", "운동하기", "수영하기"],
                intro_list: ["산책하기", "운동하기", "수영하기"],
                positives: ["활기", "체력", "웃음"],
                negatives: ["활기", "체력", "웃음"],
                recommendations: [
                    "주말에 나가서 산책을 하세요.",
                    "친구들을 만나 영화를 보세요.",
                    "상큼한 과일을 먹고 비타민 충전을 하세요.",
                    "휴대폰을 끄고 자연과 친해져 보세요.",
                    "밝은 색의 옷을 입고 밖으로 나가 보세요.",
                ],
                statistics: [
                    { extro: 40, intro: 60 },
                    ["도슨트", "휴식", "자두", "복숭아", "비타민"],
                ],
            },
        };
    },
    async mounted() {
        const { getReport } = useGenerateService();
        //const res = await getReport();
        //console.log(res);
    },
};
</script>

<style lang="scss" scoped>
.contents {
    padding: 4rem 2.5rem 1.5rem 2.5rem;
}
.report-stat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;

    img {
        width: 80%;
    }
}

.report-keyword {
    color: #000;
    text-align: center;
    font-family: "Pretendard Bold";
    font-size: 10px;
    line-height: 20.8px; /* 208% */
    text-transform: capitalize;
    margin-top: 2rem;
}

.report-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 2rem;

    .report-title {
        color: #000;
        font-family: "Pretendard Bold";
        font-size: 16px;
        line-height: 21px; /* 131.25% */
        margin-bottom: 0.75rem;
    }

    .report-desc {
        color: rgba(0, 0, 0, 0.95);
        font-family: "Pretendard";
        font-size: 16px;
        line-height: 20.8px; /* 130% */
        text-transform: capitalize;
    }
}
</style>
