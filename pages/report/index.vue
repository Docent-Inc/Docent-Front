<template>
    <div class="contents">
        <div class="title">서준 님의 깊은 곳이에요</div>

        <div class="report-stat">
            <img :src="IMG.IntrovertSVG" id="introvert" />
            <img :src="IMG.ExtrovertSVG" id="extrovert" />
            <div id="introvert_txt">
                내향 <br />
                30%
            </div>
            <div id="extrovert_txt">
                외향 <br />
                70%
            </div>
        </div>
        <div class="report-keyword">
            <div>Key Word</div>
            <div>{{ data.Statistics[1].join(", ") }}</div>
        </div>

        <div class="report-content">
            <div class="report-title">Mental State</div>
            <div>
                {{ data.content["Mental State"] }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">외향적 활동</div>
            <div
                class="report-desc"
                v-for="extro in data['Extroverted Activities']"
                :key="extro"
            >
                • {{ extro }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">내향적 활동</div>
            <div v-for="intro in data['Introverted Activities']" :key="intro">
                • {{ intro }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">긍정적인 부분 3개</div>
            <div
                class="report-desc"
                v-for="positive in data.Positives"
                :key="positive"
            >
                • {{ positive }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">부정적인 부분 3개</div>
            <div
                class="report-desc"
                v-for="negative in data.Negatives"
                :key="negative"
            >
                • {{ negative }}
            </div>
        </div>
        <div class="report-content">
            <div class="report-title">추천</div>
            <div
                class="report-desc"
                v-for="recomendation in data.Recommendations"
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
                content: {
                    "Mental State":
                        "서준님은 대부분의 계획을 다음과 같이 진행하고 있습니다. 당신의 꿈, 일기 그리고 일정을 보면 성장을 위한 고민을 깊게 하고 있으며, 스타트업을 관리하고 성공에 올인을 거는 엄청난 노력에 주력하다 보니 스트레스와 피로가 쌓인 것을 확인할 수 있습니다. 항상 야망이 크고 새로운 것들을 배우려는 상태를 유지하고 있으며 때때로 이러한 책임감과 목표 달성의 부담감 때문에 분주함과 압박감을 느끼는 경우도 있는 것 같습니다.",
                },
                "Extroverted Activities": [
                    "스타트업 대표로 활동",
                    "GCS(Gachon Cocone School)의 프로그램에 참여하여 공덕의 디캠프 및 서울 창업 허브에 방문",
                    "부산 여행",
                ],
                "Introverted Activities": [
                    "오리지널스 읽기",
                    "서비스 기획",
                    "기브앤 테이크 책에 대한 고민",
                ],
                Positives: [
                    "좋은 강의와 네트워킹 기회를 제공하는 프로그램에 참여",
                    "스타트업 대표로서의 용기와 열정",
                    "유니콘 기업이 되기 위한 야심찬 계획",
                ],
                Negatives: [
                    "스타트업 대표로서의 부담감",
                    "아직 해결되지 않은 문제에 대한 불안감",
                    "여행을 통한 휴식이 부족한 것 같음",
                ],
                Recommendations: [
                    "레크리에이션 활동이나 휴가를 통한 휴식 시간을 가져보시는 것이 어떠세요?",
                    "스트레스 관리 방법에 대해 고민해보실 필요가 있어 보입니다.",
                    "개인 생활과 스타트업 관리에 대한 워크-라이프 밸런스를 유지하려는 노력이 필요해 보입니다.",
                    "스타트업을 이끌기 위해 필요한 지식과 기술을 계속해서 배우는 것을 권장드립니다.",
                    "지난 주에 대한 반성을 통해 확인된 부족한 부분을 개선하는 방향으로 나아가는 것이 좋아 보입니다.",
                ],
                Statistics: [
                    {
                        외향: 70,
                        내향: 30,
                    },
                    [
                        "스타트업",
                        "도슨트",
                        "서비스 기획",
                        "스트레스 관리",
                        "휴식",
                    ],
                ],
            },
        };
    },
    async mounted() {
        // TODO: accessToken 제거
        // window.localStorage.setItem(
        //     "accessToken",
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJleHAiOjIwNTM1NDcxNzZ9.Dqf6UOvR-OlKY6cVMjoN0AJ25stW8ojdSy2GZ5dyHlc"
        // );
        // const { getReport } = useGenerateService();
        // const res = await getReport();
        // console.log(res);
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

        transform: translate(10%, -10%); // extrovert
        // transform: translate(0%, -10%);
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

        transform: translate(0%, 10%);
        // transform: translate(-10%, 10%); // introvert
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
</style>
