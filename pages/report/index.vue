<template>
    <div class="contents">
        <div class="title">{{ name }} 님의 깊은 곳이에요</div>

        <Statistics :statistics="data.statistics" />
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
import IntrovertSVG from "../../assets/images/img_introvert.svg";
import ExtrovertSVG from "../../assets/images/img_extrovert.svg";
import Statistics from "../../components/report/Statistics.vue";

export default {
    name: "Report",
    setup() {
        definePageMeta({
            layout: "main",
        });
    },
    components: { Statistics },
    data() {
        return {
            IMG: {
                IntrovertSVG: IntrovertSVG,
                ExtrovertSVG: ExtrovertSVG,
            },
            data: {
                create_date: "2023-08-29T14:36:18",
            },
            name: "",
        };
    },
    async mounted() {
        this.$eventBus.$emit("onLoading", true);

        // TODO: accessToken 제거
        window.localStorage.setItem(
            "accessToken",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjIwNTM1NDcxNzZ9.Dqf6UOvR-OlKY6cVMjoN0AJ25stW8ojdSy2GZ5dyHlc"
        );

        // Check
        console.log(window.localStorage.getItem("accessToken"));
        if (!window.localStorage.getItem("accessToken")) {
            console.log(this.$eventBus);
            this.$eventBus.$emit("onLoginModal");
            return;
        }

        this.name = window.localStorage.getItem("name");

        const { getReport } = useGenerateService();
        const res = await getReport();
        this.data = res.data;
        this.$eventBus.$emit("onLoading", false);
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
</style>
