<template>
    <div class="contents">
        <div class="title">서준 님의 깊은 곳이에요</div>

        <div class="report-stat">
            <img :src="IMG.IntrovertSVG" id="introvert" />
            <img :src="IMG.ExtrovertSVG" id="extrovert" />
            <div id="introvert_txt">
                내향 <br />
                {{ data.statistics ? data.statistics[0]["내향"] : "" }}%
            </div>
            <div id="extrovert_txt">
                외향 <br />
                {{ data.statistics ? data.statistics[0]["외향"] : "" }}%
            </div>
        </div>
        <div class="report-keyword">
            <div>Key Word</div>
            <div>
                {{ data.statistics ? data.statistics[1].join(", ") : "" }}
            </div>
        </div>

        <div class="report-content">
            <div class="report-title">Mental State</div>
            <div>
                {{ data.mental_state }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">외향적 활동</div>
            <div
                class="report-desc"
                v-for="extro in data.extroverted_activities"
                :key="extro"
            >
                • {{ extro }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">내향적 활동</div>
            <div v-for="intro in data.introverted_activities" :key="intro">
                • {{ intro }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">긍정적인 부분 3개</div>
            <div
                class="report-desc"
                v-for="positive in data.positives"
                :key="positive"
            >
                • {{ positive }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">부정적인 부분 3개</div>
            <div
                class="report-desc"
                v-for="negative in data.negatives"
                :key="negative"
            >
                • {{ negative }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">추천</div>
            <div
                class="report-desc"
                v-for="recomendation in data.recommendations"
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
import IntrovertSVG from "../../assets/images/img_introvert.svg";
import ExtrovertSVG from "../../assets/images/img_extrovert.svg";

export default {
    name: "Report",
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    data() {
        return {
            IMG: {
                IntrovertSVG: IntrovertSVG,
                ExtrovertSVG: ExtrovertSVG,
            },
            data: {
                create_date: "2023-08-29T14:36:18",
            },
        };
    },
    async mounted() {
        // TODO: accessToken 제거
        window.localStorage.setItem(
            "accessToken",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjIwNTM1NDcxNzZ9.Dqf6UOvR-OlKY6cVMjoN0AJ25stW8ojdSy2GZ5dyHlc"
        );
        const { getReport } = useGenerateService();
        const res = await getReport();
        this.data = res.data;
        console.log(res);
        console.log(this.data);
    },
};
</script>

<style lang="scss" scoped>
.contents {
    padding: 4rem 2.5rem 1.5rem 2.5rem;
    background: #000;
    color: #fff;

    .title {
        color: #fff;
    }
}
.report-stat {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 3rem;
    height: 40%;
    position: relative;

    color: rgba(255, 255, 255, 0.95);
    font-family: "Pretendard Bold";
    font-size: 16px;
    line-height: calc(16px * 1.3); /* 130% */
    text-transform: capitalize;

    #introvert {
        // width: 20%; // 10:90
        // width: 25%; // 20:80
        width: 30%; // 30:70
        // width: 35%; // 40:60
        // width: 40%; // 50:50
        // width: 45%; // 60:50
        // width: 50%; // 70:30
        // width: 45%; // 80:20
        // width: 60%; // 90:10

        margin-top: -10%;
        margin-right: -2.5%;
        animation: rotateReverse 4s infinite;
    }

    #extrovert {
        // width: 60%; // 10:90
        // width: 55%; // 20:80
        width: 50%; // 30:70
        // width: 45%; // 40:60
        // width: 40%; // 50:50
        // width: 35%; // 60:40
        // width: 30%; // 70:30
        // width: 25%; // 80:20
        // width: 20%; // 90:10

        margin-bottom: -10%;
        margin-left: -2.5%;
        animation: rotate 6s infinite;
    }

    #extrovert_txt {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(20%, -30%);
        // transform: translate(20%, -50%);
    }
    #introvert_txt {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(-20%, -70%);
        // transform: translate(-20%, -50%);
    }
}

.report-keyword {
    color: rgba(255, 255, 255, 0.95);
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
        font-family: "Pretendard Bold";
        font-size: 16px;
        line-height: 21px; /* 131.25% */
        margin-bottom: 0.75rem;
    }
    .report-title::before {
        content: "▸";
        display: inline-block;
        margin-right: 0.31rem;
    }

    .report-desc {
        color: rgba(255, 255, 255, 0.95);
        font-family: "Pretendard";
        font-size: 16px;
        line-height: 20.8px; /* 130% */
        text-transform: capitalize;
    }
}

@keyframes rotate {
    from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes rotateReverse {
    from {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
    to {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
}
</style>
