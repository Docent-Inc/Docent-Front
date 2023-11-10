<template>
    <div class="report-stat">
        <img :src="IMG.IntrovertSVG" id="introvert" :style="style_introvert" />
        <img :src="IMG.ExtrovertSVG" id="extrovert" :style="style_extrovert" />
        <div id="introvert_txt">
            내향 <br />
            {{ introvert }} %
        </div>
        <div id="extrovert_txt">
            외향 <br />
            {{ extrovert }}%
        </div>
    </div>
</template>
<script>
import IntrovertSVG from "../../assets/images/img_introvert.svg";
import ExtrovertSVG from "../../assets/images/img_extrovert.svg";
export default {
    name: "Statistics",
    props: {
        statistics: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            IMG: {
                IntrovertSVG: IntrovertSVG,
                ExtrovertSVG: ExtrovertSVG,
            },
        };
    },
    computed: {
        introvert() {
            if (!this.statistics) return 0;

            return this.statistics[0]["내향"];
        },
        extrovert() {
            if (!this.statistics) return 0;

            return this.statistics[0]["외향"];
        },
        style_introvert() {
            const first = `${parseInt(this.introvert / 10)}`;
            return `width: ${20 + 5 * (first - 1)}%;`;
        },
        style_extrovert() {
            const first = `${parseInt(this.extrovert / 10)}`;
            return `width: ${20 + 5 * (first - 1)}%;`;
        },
    },
};
</script>
<style lang="scss" scoped>
/**
 * Logic
 * 20 ~ 60까지 +5씩
 * 10 -> 20%, 20 -> 25%, 30 -> 30%,
 * 20 + (5 * 0), 20 + (5 * 1), ... 20 + 20 + (5 * 8)
 *  */
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
        margin-top: -10%;
        margin-right: -1.5%;
        animation: rotateReverse 4s infinite;
    }

    #extrovert {
        margin-bottom: -10%;
        margin-left: -1.5%;
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
